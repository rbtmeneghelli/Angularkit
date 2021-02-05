import { ExportadorService } from 'src/app/app_business/service/exportador.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { AbstractControl } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { ClienteFilterData } from 'src/app/app_entities/filter/cliente-filter-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SharedService {

    // tslint:disable-next-line: max-line-length
    constructor(protected http: HttpClient, protected route: Router, protected exportadorService: ExportadorService, protected snackBar: MatSnackBar) { }

    public enviarNotificacao(titulo: string, texto: string, tipo: any) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            confirmButtonText: 'Ok'
        });
    }

    public enviarNotificaçãoConfirmar(titulo: string, texto: string, tipo: any, objeto: any) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.value) {
                this.enviarNotificacao('', '', 'success');
            }
        });
    }

    public enviarNotificaçãoConfirmarVoltar(titulo: string, texto: string, tipo: any, objeto: any, rota: string) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#c3c3c3',
            cancelButtonColor: '#c3c3c3',
            confirmButtonText: 'Confirmar'
        })
            .then(result => {
                if (result.value) {
                    this.route.navigate([`/${rota}`]);
                }
            })
            .catch(err => { });
    }

    public enviarNotificacaoToRoute(titulo: string, texto: string, tipo: any, rota: string) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            confirmButtonColor: '#c3c3c3',
            confirmButtonText: 'OK'
        })
            .then(result => {
                if (result.value) {
                    this.route.navigate([`${rota}`]);
                }
            })
            .catch(err => { });
    }

    public removerAcento(provinciaEstadoTexto: string): string {
        provinciaEstadoTexto = provinciaEstadoTexto.toLowerCase();
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        provinciaEstadoTexto = provinciaEstadoTexto.replace(new RegExp('[Ç]', 'gi'), 'c');
        return provinciaEstadoTexto;
    }

    public blockCaracteresEspeciais(eventKeyCode: any): boolean {
        if (eventKeyCode >= 48 && eventKeyCode <= 57) {
            return true;
        } else if (eventKeyCode >= 64 && (eventKeyCode !== 91 && eventKeyCode !== 92 &&
            eventKeyCode !== 93 && eventKeyCode !== 94 && eventKeyCode !== 95 && eventKeyCode !== 96 &&
            eventKeyCode !== 123 && eventKeyCode !== 124 && eventKeyCode !== 125 &&
            eventKeyCode !== 126 && eventKeyCode !== 167 && eventKeyCode !== 168 &&
            eventKeyCode !== 176 && eventKeyCode !== 180 && eventKeyCode !== 186)) {
            return true;
        } else if (eventKeyCode === 32) {
            return true;
        } else {
            return false;
        }
    }

    public ConvertTimeStampToStringTime(parametro: string): string {
        const horaInicio = new Date(parametro).getUTCHours() + ':' +
            (new Date(parametro).getUTCMinutes() < 10 ? '0' + new Date(parametro).getUTCMinutes() : new Date(parametro).getUTCMinutes());
        return horaInicio;
    }

    public download(url: string): any {
        let headers = new HttpHeaders();
        headers = headers
            .set(
                'Authorization',
                'Bearer ' +
                sessionStorage
                    .getItem('jhi-authenticationtoken')
                    .replace('"', '')
                    .trim()
            )
            .append('Accept', 'application/pdf')
            .append('Access-Control-Allow-Origin', '*');
        return this.http.get(url, { headers, responseType: 'blob' as 'json' });
    }

    public validarCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj === '' || cnpj.length !== 14) {
            return false;
        }

        if (cnpj === '00000000000000' || cnpj === '11111111111111' || cnpj === '22222222222222' ||
            cnpj === '33333333333333' || cnpj === '44444444444444' || cnpj === '55555555555555' ||
            cnpj === '66666666666666' || cnpj === '77777777777777' || cnpj === '88888888888888' ||
            cnpj === '99999999999999') {
            return false;
        }

        let resultado = 0;
        let tamanho: number = cnpj.length - 2;
        let numeros: string = cnpj.substring(0, tamanho);
        const digitos: string = cnpj.substring(tamanho);

        let soma = 0;
        let pos = tamanho - 7;
        let resSoma: number;
        for (let i = tamanho; i >= 1; i--) {
            resSoma = tamanho - i;
            // tslint:disable-next-line: radix
            soma += parseInt(numeros.charAt(resSoma)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== Number(digitos.charAt(0))) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            resSoma = tamanho - i;
            // tslint:disable-next-line: radix
            soma += parseInt(numeros.charAt(resSoma)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== Number(digitos.charAt(1))) {
            return false;
        }

        return true;
    }

    public validarCpf(cpf: string): boolean {
        let soma: number;
        let resto: number;
        let valido: boolean;

        soma = 0;
        const regex = new RegExp('[0-9]{11}');

        if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
            cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' ||
            cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' ||
            cpf === '99999999999' || !regex.test(cpf)) {
            valido = false;
        } else {
            for (let i = 1; i <= 9; i++) {
                // tslint:disable-next-line: radix
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;

            if (resto === 10 || resto === 11) { resto = 0; }
            // tslint:disable-next-line: radix
            if (resto !== parseInt(cpf.substring(9, 10))) { valido = false; }

            soma = 0;
            for (let i = 1; i <= 10; i++) {
                // tslint:disable-next-line: radix
                soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            resto = (soma * 10) % 11;

            if (resto === 10 || resto === 11) { resto = 0; }
            // tslint:disable-next-line: radix
            if (resto !== parseInt(cpf.substring(10, 11))) { valido = false; }
            valido = true;
        }
        return valido;
    }

    public converteStringParaDecimal(numero: string) {
        return numero.replace(',', '.');
    }

    public converteStringParaDecimalToDatabase(numero: string) {
        const regex = /\./gi;
        const stNumeroSplit = numero.split('.');
        if (stNumeroSplit.length > 1) {
            return stNumeroSplit[0].replace(regex, '').trim() + stNumeroSplit[1].replace(',', '.');
        }
        return numero.replace(',', '.');
    }

    public converteDecimalParaString(numero: string) {
        const regex = /\,/gi;
        const stNumero: string = Number(numero)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const stNumeroSplit = stNumero.split('.');
        return stNumeroSplit[0].replace(regex, '.') + ',' + stNumeroSplit[1];
    }

    public copiaObjeto(objeto: any, objetoBaseExcluir, propriedadesExcluir: any[]) {
        const objetoCopy = Object.assign({}, objeto);

        if (propriedadesExcluir !== null) {
            propriedadesExcluir.forEach(x => {
                if (objetoBaseExcluir !== null) {
                    delete objetoCopy[objetoBaseExcluir][x];
                } else {
                    delete objetoCopy[x];
                }
            });
        }
        return objetoCopy;
    }

    public formataMilhar(numero: number) {
        const regex = /\,/gi;
        const stNumero: string = numero.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const stNumeroSplit = stNumero.split('.');
        return stNumeroSplit[0].replace(regex, '.') + ',' + stNumeroSplit[1];
    }

    public getArquivoExtensao(url: string) {
        return '.' + url.substring(url.lastIndexOf('.') + 1, url.length) || url;
    }

    public removerAcentos(s: string) {
        return s
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();
    }

    public formataNumeroToMilhar(stNumero: string, blTrocarVirgulaPorPonto) {
        if (stNumero !== null && stNumero !== undefined) {
            if (blTrocarVirgulaPorPonto) {
                stNumero = stNumero.trim().replace(',', '.');
            } else {
                stNumero = stNumero.trim().replace('.', ',');
            }
        } else {
            stNumero = '0';
        }
        return stNumero;
    }

    public verifyfieldIsEmpty(campo: string) {
        if (campo === null || campo === undefined || campo === '') {
            return true;
        }
        return false;
    }

    public verifyListIsEmpty(lista: Array<any>): boolean {
        if (lista === null || lista === undefined) {
            return true;
        }
        return false;
    }

    public b64DecodeUnicode(str) {
        // tslint:disable-next-line: only-arrow-functions
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    public getListaStatus(): Array<DropDownList> {
        const lista: Array<DropDownList> = new Array<DropDownList>();
        lista.push({ value: '0', viewValue: 'Inativo' });
        lista.push({ value: '1', viewValue: 'Ativo' });
        return lista;
    }

    public applyFontFamilyOnText(texto: string) {
        if (!!texto) {
            if (texto.includes('<span style="font-family: sans serif; font-size: 9px;">')) {
                return texto;
            } else if (texto === '' || texto.includes('<br>')) {
                return '';
            } else {
                return '<span style="font-family: sans serif; font-size: 9px;">' + texto + '</span>';
            }
        }
        return '';
    }

    checkFileSizeToUpload(file: any): boolean {
        if (Number(file.size) > 0) {
            if (Math.round(Number(file.size) / 1024 / 1024) < 11) {
                return true;
            }
        }
        return false;
    }

    public objetoParaString(objeto: any) {
        // tslint:disable-next-line: only-arrow-functions
        Date.prototype.toJSON = function () {
            // TODO: EFETUAR NPM INSTALL DO MOMENT
            // return moment(this).format();
            return null;
        };
        return JSON.stringify(objeto);
    }

    public showFormDataCOntent(formData: FormData) {
        // for (const pair of formData.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
    }

    getDialogConfig(): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.maxWidth = '80vw';
        dialogConfig.maxHeight = '40vw';
        dialogConfig.width = '80vw';
        dialogConfig.height = 'auto';
        return dialogConfig;
    }

    exportExcel(lista: ClienteFilterData, url?: string) {
        this.exportadorService.export2Excel(lista, url).subscribe(
            node => {
                const urlTmp = window.URL.createObjectURL(node.data);
                const hiddenLink = document.createElement('a');
                document.body.appendChild(hiddenLink);
                hiddenLink.setAttribute('style', 'display: none');
                hiddenLink.href = urlTmp;
                hiddenLink.download = node.filename;
                hiddenLink.click();
                window.URL.revokeObjectURL(urlTmp);
                hiddenLink.remove();
            });
    }

    enviarNotificacaoSnackBar(message?: string, isError?: boolean) {
        this.snackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: isError ? ['msg-error'] : ['msg-success']
        });
    }

    public criarNovoObjeto(target?: any, source?: any, removePropertyId?: boolean): any {
        // target: Fonte Alvo || source: Fonte de dados
        // const target = { id: 1, a: 1, b: 2 };
        // const source = { b: 4, c: 5 };
        const newObject = Object.assign(target, source);
        if (removePropertyId && newObject.hasOwnProperty('id')) {
            delete newObject.id;
        }
        return newObject;
    }

    public timeDiffCalc(dateFuture, dateNow): string {
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        let difference = '';
        if (days > 0) {
            difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }
        difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
        difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
        return difference;
        // Fazendo a chamada do metodo
        // console.log(timeDiffCalc(new Date('2019/10/1 04:10:00'), new Date('2019/10/2 18:20:00')));
    }

    public replaceAll(word?: string, oldletter?: string, newLetter?: string): string {
        if (!!word) {
            word = word.replace(new RegExp(oldletter, 'g'), newLetter).trim();
        }
        return word;
    }

    public convertNumberToString(value?: number): string {
        return value?.toLocaleString('pt-br');
    }

    public convertStringToNumber(value?: string): number {
        if (isNaN(Number(value))) {
            // const stValue: string = value.toString();
            return Number(value.replace(',', '.'));
        }
        return Number(value);
    }

    public roundValue(value: number): number {
        return !!value ? Math.round(value * 100) / 100 : 1;
    }

    public createDateTimeData(date?: string, time?: string): Date {
        if (date?.length >= 8 && time?.length >= 4) {
            if (date?.includes('/')) {
                date = this.replaceAll(date, '/', '');
            }
            if (time?.includes(':')) {
                time = this.replaceAll(time, ':', '');
            }
            // tslint:disable-next-line: max-line-length
            return new Date(Date.UTC(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)), Number(time.substr(0, 2)), Number(time.substr(2, 2)), 0, 0));
        }
    }

    public createDateToString(date?: string): string {
        if (date?.length >= 8) {
            date = this.replaceAll(date, '/', '');
            // tslint:disable-next-line: max-line-length
            return Number(date.substr(date.length - 4, 4)) + '-' + (Number(date.substr(2, 2))) + '-' + Number(date.substr(0, 2));
        }
    }

    public createDate(date?: string): Date {
        if (date?.length >= 8 && !date?.includes('/')) {
            return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
        } else if (!!date) {
            date = this.replaceAll(date, '/', '');
            return new Date(Number(date.substr(date.length - 4, 4)), Number(date.substr(2, 2)) - 1, Number(date.substr(0, 2)));
        }
    }

    public convertStringToDate(date?: string): string {
        if (!!date && date?.length >= 10) {
            return new Date(date).toLocaleDateString('pt-br');
        } else {
            return '';
        }
    }

    public convertStringToDateOrTimeOnly(pDate?: string, isDate?: boolean): string {
        if (!!pDate && pDate?.length >= 10) {
            // tslint:disable-next-line: max-line-length
            return isDate ? new Date(pDate).toLocaleDateString('pt-br') : new Date(pDate).toLocaleTimeString('pt-br').substr(0, 5);
        } else {
            return '';
        }
    }

    public CalcPorc(pNumber1: number, pNumber2: number): number {
        return ((pNumber1 / pNumber2) * 100);
    }

    public CalcLitros(pNumber1: number, pNumber2: number): number {
        return ((pNumber1 / pNumber2) / 100);
    }

    public CalcTimeDiffDay(dateFuture, dateNow): number {
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        return Math.floor(diffInMilliSeconds / 86400);
    }

    public async getDataFromLocalStorage(fileName?: string): Promise<any> {
        let path: string = 'data_';
        path = path.concat(fileName);
        if (localStorage.hasOwnProperty((path))) {
            let data = JSON.parse(localStorage.getItem(path));
            return data;
        }
        return [];
    }
}

export function ValidarSelect(control: AbstractControl) {
    if (control.value === '0') {
        return { selectValido: true };
    }
    return null;
}
