import { ExportadorService } from 'src/app/app_business/service/exportador.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { validarCNPJ, validarCpf } from '../shared/shared-functions-boolean';
import { b64DecodeUnicode } from '../shared/shared-functions-string';
import { ClienteFilterData } from 'src/app/app_entities/filter/cliente-filter-data.model';
import { arrString } from 'src/app/app_entities/shared/shared-types';
import { catchError, map } from 'rxjs/operators';
import { CardCabecalhoDTO } from 'src/app/app_entities/dto/cardCabecalho.dto';

@Injectable({
    providedIn: 'root'
})

export class SharedService {

    private currentPage?: BehaviorSubject<string>;

    // tslint:disable-next-line: max-line-length
    constructor(
        private readonly http: HttpClient,
        private readonly exportadorService: ExportadorService,
    ) {
        this.currentPage = new BehaviorSubject<string>('');
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

    public objetoParaString(objeto: any) {
        // tslint:disable-next-line: only-arrow-functions
        Date.prototype.toJSON = function () {
            // TODO: EFETUAR NPM INSTALL DO MOMENT
            // return moment(this).format();
            return null;
        };
        return JSON.stringify(objeto);
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

    public async getDataFromLocalStorage(fileName?: string): Promise<any> {
        let path: string = 'data_';
        path = path.concat(fileName);
        if (localStorage.hasOwnProperty((path))) {
            let data = JSON.parse(localStorage.getItem(path));
            return data;
        }
        return [];
    }

    public async validForm(arrForms?: Array<FormGroup>): Promise<string> {
        for (const form of arrForms) {
            if (!form.valid) {
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
            return JSON.parse(b64DecodeUnicode(accessToken.split('.')[1]));
        }
        return null;
    }

    public converttokentostring(token: any) {
        //Arruma dados com acento dentro do token
        return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
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
        if (control.value && !validarCpf(control.value)) {
            return { cpf: true };
        }
        return null;
    }

    public validateCnpj(control: AbstractControl): ValidationErrors | null {
        if (control.value && !validarCNPJ(control.value)) {
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

    public freezeObject(object: any): any {
        Object.freeze(object);
        return object;
    }

    public setarCoresCliente(): void {
        const corPrimaria = '#982424';
        const corSecundaria = '#FFFFFF';
        const arrVarPrimaria: arrString = [
            '--corPrincipal-100',
            '--corPrincipal-200',
            '--corPrincipal-300',
            '--corPrincipal-400',
        ];
        const arrVarSecundario: arrString = [
            '--corSecundaria-100',
            '--corSecundaria-200',
            '--corSecundaria-300',
            '--corSecundaria-400',
        ];

        this.AplicarCoresCliente(arrVarPrimaria, corPrimaria);
        this.AplicarCoresCliente(arrVarSecundario, corSecundaria);
    }

    private AplicarCoresCliente(
        arrVariaveisCor: arrString,
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

    getUserIpAddress(): Observable<string> {
        return this.http.get('http://api.ipify.org/?format=json').pipe(map((res: any) => { return res.ip }), catchError((error: any) => { return 'Erro ao capturar seu IP' }));
    }

    getHeaderSettings(tituloCard: string, tituloModulo: string, nomeTela: string): CardCabecalhoDTO {
        let cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
        cardCabecalhoDTO.tituloCard = tituloCard;
        cardCabecalhoDTO.tituloModulo = tituloModulo;
        cardCabecalhoDTO.nomeTela = nomeTela;
        return cardCabecalhoDTO;
    }
}
