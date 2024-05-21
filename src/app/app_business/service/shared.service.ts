import { SharedMessages } from 'src/app/app_business/constants/shared-constants';
import { ExportadorService } from 'src/app/app_business/service/exportador.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { ClienteFilterData } from 'src/app/app_entities/filter/cliente-filter-data';
import { BehaviorSubject, Observable } from 'rxjs';

const regexOnlyNumber: RegExp = new RegExp(/[^0-9]+/g);
const regexOnlyAlphanumeric: RegExp = new RegExp(/[^a-zA-Z0-9]+/g);
const notRepeatedSpace: RegExp = new RegExp(/\s+/g);
const regexNotSpecialCharacter: RegExp = new RegExp(/[^a-zA-Záàãâäéèêëíìîïóòõôöúùûü0-9-çÇ\p{P}\s]+/g);

@Injectable({
    providedIn: 'root'
})

export class SharedService {

    private currentPage?: BehaviorSubject<string>;

    // tslint:disable-next-line: max-line-length
    constructor(
        protected http: HttpClient,
        protected exportadorService: ExportadorService,
    ) {
        this.currentPage = new BehaviorSubject<string>('');
    }

    static somenteNumerosValidos(value: any): string {
        value = value.toString().replace(regexOnlyNumber, '');
        return !!value ? (value !== '0' ? parseInt(value).toString() : '') : '';
    }

    static getOnlyNumbers(value: any): string { 
        return (value ?? '').toString().replace(regexOnlyNumber, ''); 
    } 
    
    static getOnlyAlphaNumeric(value: any): string { 
        return (value ?? '').toString().replace(regexOnlyAlphanumeric, ''); 
    }

    static toBrazilDateFormat(value: Date): string { 
        if (value === null) { 
            return null; 
        } 
        //return moment(value).format('DD/MM/YYYY'); 
    }

    static truncate(source: string, size: number, concat: string) { 
        return source.length > size ? source.slice(0, size - 1) + concat : source; 
    }

    static toBrazilFormat(value: any, minimumFractionDigits: number = 8, maximumFractionDigits: number = 8): string {
        if (value == null) return null;
        let newValue = parseFloat(value.toString());
        const numberFomat = Intl.NumberFormat('pt-BR', { minimumFractionDigits: minimumFractionDigits, maximumFractionDigits: maximumFractionDigits, }); 
        return numberFomat.format(newValue);
    }

    static getNoRepeatedSpaceAlphanumeric(value: any): string { 
        return (value ?? '').toString()
        .replace(notRepeatedSpace, ' ')
        .replace(regexNotSpecialCharacter, ''); 
    }
    
    public getCurrentPageValue(): Observable<string> {
        return this.currentPage.asObservable();
    }

    public setCurrentPageValue(newValue: string): void {
        this.currentPage.next(newValue);
    }

    public getOptionsHeader(): HttpHeaders {
        const headers = new HttpHeaders()
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin', '*');
        return headers;
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

    public verifyfieldIsNotEmpty(campo: string): boolean {
        return !!campo && campo?.length > 0 ? true : false;
    }

    public verifyListIsNotEmpty(lista: Array<any>): boolean {
        return !!lista && lista?.length > 0 ? true : false;
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

    public getDialogConfig(): MatDialogConfig {
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

    public convertStringToTimeSpan(value?: string) {
        if (!!value) {
            if (value.length === 4) {
                return value.substring(0, 2) + ':' + value.substring(2, 4);
            } else if (value.length > 4) {
                return value.substring(0, 2) + value.substring(5, 2);
            }
        }
        return new Date().getHours() + ':' + new Date().getMinutes();
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

    public timeDiffCalc(dateFuture, dateNow): number {
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        // calculate days
        let days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;

        let result = hours + (Number(minutes) / 60);

        if (days > 0) {
            days = days * 24;
            result = days + result;
        }
        return result;
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
            return new Date(date).toLocaleDateString('pt-br', { timeZone: 'UTC' });
        } else {
            return '';
        }
    }

    public convertStringToDateOrTimeOnly(pDate?: string, isDate?: boolean): string {
        if (!!pDate && pDate?.length >= 10) {
            // tslint:disable-next-line: max-line-length
            return isDate ? new Date(pDate).toLocaleDateString('pt-br', { timeZone: 'UTC' }) : new Date(pDate).toLocaleTimeString('pt-br', { timeZone: 'UTC' }).substr(0, 5);
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

    public getUserOperationSystem(): string {
        const agent: string = window.navigator.userAgent.toString();
        switch (true) {
            case agent.indexOf('Windows NT 10.0') != -1: return 'Windows 10';
            case agent.indexOf('Windows NT 6.3') != -1: return 'Windows 8.1';
            case agent.indexOf('Windows NT 6.2') != -1: return 'Windows 8';
            case agent.indexOf('Windows NT 6.1') != -1: return 'Windows 7';
            case agent.indexOf('Windows NT 6.0') != -1: return 'Windows Vista';
            case agent.indexOf('Windows NT 5.1') != -1: return 'Windows XP';
            case agent.indexOf('Windows NT 5.0') != -1: return 'Windows 2000';
            case agent.indexOf('Mac') != -1: return 'Mac/iOS';
            case agent.indexOf('X11') != -1: return 'UNIX';
            case agent.indexOf('Linux') != -1: return 'Linux';
            default: return 'Unknown';
        }
    }

    public getUserBrowser(): string {
        const agent: string = window.navigator.userAgent.toString();
        switch (true) {
            case agent.indexOf('edge') > -1: return 'edge';
            case agent.indexOf('edg') > -1: return 'chromium based edge (dev or canary)';
            case agent.indexOf('opr') > -1 && !!(<any>window).opr: return 'opera';
            case agent.indexOf('chrome') > -1 && !!(<any>window).chrome: return 'chrome';
            case agent.indexOf('trident') > -1: return 'ie';
            case agent.indexOf('firefox') > -1: return 'firefox';
            case agent.indexOf('safari') > -1: return 'safari';
            default: return 'other';
        }
    }

    public hasErrorFormControl(formControl?: AbstractControl): string {
        return formControl.hasError('required') ? SharedMessages.FORM_REQUIRED :
            formControl.hasError('minlength') ? SharedMessages.FORM_MINLENGTH :
                formControl.hasError('maxlength') ? SharedMessages.FORM_MAXLENGTH :
                    formControl.hasError('pattern') ? SharedMessages.FORM_PATTERN :
                        formControl.hasError('email') ? SharedMessages.FORM_EMAIL :
                            '';
    }

    public async validForm(arrForms?: Array<FormGroup>): Promise<string> {
        for (const form of arrForms) {
            if (!form.valid) {
                //this.alertaService.enviarNotificacao('', EnumTypeMessage.FormValid, EnumActionMessage.Info);
                form.markAllAsTouched();
                return 'Erro';
            }
        }
        return '';
    }

    public async cleanForm(arrForms?: Array<FormGroup>): Promise<void> {
        for (const form of arrForms) {
            form.reset();
        }
    }

    public existLocalStorage(fileName: string): any {
        if (!!localStorage.getItem(fileName)) {
            return true;
        }
        return false;
    }

    public validateCorporateEmail(email: FormControl): { [key: string]: boolean } | null {
        if (!/[a-zA-Z0-9][a-zA-Z0-9\._-]+@email.com.br/.test(email.value)) {
            return { validateCorporateEmail: true };
        }
        return null;
    }

    public validateCompanyFullName(company: FormControl): { [key: string]: boolean } | null {
        if (!/[a-zA-Z0-9]* [a-zA-Z0-9]*/.test(company.value)) {
            return { validateCompanyFullName: true };
        }
        return null;
    }

    public validateFullName(name: FormControl): { [key: string]: boolean } | null {
        if (!/[a-zA-Z0-9]* [a-zA-Z0-9]*/.test(name.value)) {
            return { validateFullName: true };
        }
        return null;
    }

    public getTokenData(accessToken: string): any {
        if (!!accessToken) {
            return JSON.parse(this.b64DecodeUnicode(accessToken.split('.')[1]));
        }
        return null;
    }

    public converttokentostring(token: any) {
        //Arruma dados com acento dentro do token
        return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
    }

    public convertObjInByte(data: any): string {
        return btoa(JSON.stringify(data));
    }

    public refreshPage(): void {
        setInterval(() => {
            window.location.reload();
        }, 6000);
    }

    private convertPtBrDateStringToEnUsDateString(dateValue: string): string {
        return dateValue.split("/").reverse().join("-");
    }

    public passwordMatchValidator(Senha: string): ValidationErrors | null {
        return (control: FormControl) => {
            if (!control || !control.parent) {
                return null;
            }
            return control.parent.get(Senha).value === control.value ? null : { mismatch: true };
        };
    }

    public validateCpf(control: AbstractControl): ValidationErrors | null {
        if (control.value && !this.validarCpf(control.value)) {
            return { cpf: true };
        }
        return null;
    }

    public validateCnpj(control: AbstractControl): ValidationErrors | null {
        if (control.value && !this.validarCNPJ(control.value)) {
            return { cnpj: true };
        }
        return null;
    }

    public passwordDefinition(control: AbstractControl): ValidationErrors | null {

        if (!!control.value && control.value?.length === 0) {
            return null;
        }

        // Pelo menos um caractere especial    
        if (/(?=.*?[#?!@$%^&*-])/.test(control.value)) {
            return { hasSpecialCharacters: true };
        }

        // Pelo menos uma letra maiúscula    
        if (/(?=.*?[A-Z])/.test(control.value)) {
            return { hasUperCase: true };
        }

        // Pelo menos uma letra minuscula    
        if (/(?=.*?[a-z])/.test(control.value)) {
            return { hasLowerCase: true };
        }

        // Pelo menos um dígito    
        if (/(?=.*?[0-9])/.test(control.value)) {
            return { hasDigit: true };
        }

        return null;
    }

    public orderByDropDownList(lista: Array<DropDownList>): Array<DropDownList> {
        // tslint:disable-next-line: only-arrow-functions
        return lista.sort(function (a, b) {
            if (a.viewValue > b.viewValue) {
                return 1;
            }
            if (a.viewValue < b.viewValue) {
                return -1;
            }
            return 0;
        });
    }

    public numericOnly(event: any): boolean {
        const pattern = /^[0-9]*$/g;
        const result = pattern.test(event.key);
        return result;
    }

    public convertStringToBinaryString(text: string) {
        var result = '';
        if (!!text) {
            for (var i = 0; i < text.length; i++) {
                result += text[i].charCodeAt(0).toString(2) + " ";
            }
        } else {
            result = text;
        }
        return result;
    }

    public freezeObject(object: any): any {
        Object.freeze(object);
        return object;
    }

    public existItemInList(list: any[]): boolean {
        //Funciona semelhante ao includes, porem e mais eficiente com uma lista muito extensa de dados
        const listSet = new Set(list);
        return listSet.has('item');
    }

    public _filterDropDownList(list?: any[], value?: string): DropDownList[] {
        if (!!list && list?.length > 0) {
            if (value?.length > 0 && !!value) {
                list = list.filter(option => option.name?.toLowerCase()?.includes(value?.toLowerCase()));
            }
            return this.orderByDropDownList(list);
        } else {
            return new Array<DropDownList>();
        }
    }

    public isValidDate(valueDate: string, valueHour: string): boolean {
        if (!!valueDate && !!valueHour) {
            if (valueDate.length >= 8) {
                return true;
            }
        }
        return false;
    }

    public getDateFormat(value: Date) {
        return value.toLocaleDateString().split('/').reverse().join('-');
    }

    public validDate(paramIni: string = '2024-01-15', paramFinal: string = '2024-01-15'){
        let initialDate = new Date(paramIni).setHours(0,0,0,0);
        let finalDate = new Date(paramFinal).setHours(0,0,0,0);
        return initialDate.valueOf() < finalDate.valueOf() ? false : true;        
    }

    public setarCoresCliente(): void {
        const corPrimaria = '#982424';
        const corSecundaria = '#FFFFFF';
        const arrVarPrimaria: string[] = [
            '--corPrincipal-100',
            '--corPrincipal-200',
            '--corPrincipal-300',
            '--corPrincipal-400',
        ];
        const arrVarSecundario: string[] = [
            '--corSecundaria-100',
            '--corSecundaria-200',
            '--corSecundaria-300',
            '--corSecundaria-400',
        ];

        this.AplicarCoresCliente(arrVarPrimaria, corPrimaria);
        this.AplicarCoresCliente(arrVarSecundario, corSecundaria);
    }

    private AplicarCoresCliente(
        arrVariaveisCor: string[],
        corEscolhidaCliente: string
    ) {
        if (corEscolhidaCliente) {
            for (let count = 0; count <= arrVariaveisCor.length - 1; count++) {
                document.documentElement.style.setProperty(
                    arrVariaveisCor[count],
                    corEscolhidaCliente.replace(/"/g, '')
                );
            }
        }
    }
}

export function ValidarSelect(control: AbstractControl) {
    if (control.value === '0') {
        return { selectValido: true };
    }
    return null;
}
