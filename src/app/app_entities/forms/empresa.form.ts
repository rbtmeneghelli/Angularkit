import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

const ValidarCnpj = (controle: AbstractControl) => {
    let cnpj = controle.value;

    if (cnpj === undefined) {
        return { cnpjInvalido: true };
    }
    
    if (cnpj === '' || cnpj.length !== 14 || cnpj === undefined) {
        return { cnpjInvalido: true };
    }

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (
        cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999'
    ) {
        return { cnpjInvalido: true };
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

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(0))) {
        return { cnpjInvalido: true };
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

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(1))) {
        return { cnpjInvalido: true };
    }

    return null;
}

export const FORMULARIO_EMPRESA = new FormGroup({
    ID: new FormControl(['']),
    CNPJ: new FormControl(['', [Validators.required, ValidarCnpj]]),
    NOMEEMPRESA: new FormControl(['', Validators.required]),
    NOMEFANTASIA: new FormControl(['', Validators.required]),
    STATUS: new FormControl(['', Validators.required])
});
 

