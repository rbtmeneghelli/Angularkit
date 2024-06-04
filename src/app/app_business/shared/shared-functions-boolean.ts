export const blockCaracteresEspeciais = (eventKeyCode: any): boolean => {
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

export const validarCNPJ = (cnpj: string): boolean => {
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

export const validarCpf = (cpf: string): boolean => {
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

export const verifyfieldIsNotEmpty = (campo: string): boolean => {
    return !!campo && campo?.length > 0 ? true : false;
}

export const verifyListIsNotEmpty = (lista: Array<any>): boolean => {
    return !!lista && lista?.length > 0 ? true : false;
}

export const checkFileSizeToUpload = (file: any): boolean => {
    if (Number(file.size) > 0) {
        if (Math.round(Number(file.size) / 1024 / 1024) < 11) {
            return true;
        }
    }
    return false;
}

export const isValidDate = (valueDate: string, valueHour: string): boolean => {
    if (!!valueDate && !!valueHour) {
        if (valueDate.length >= 8) {
            return true;
        }
    }
    return false;
}

export const validDate = (paramIni: string = '2024-01-15', paramFinal: string = '2024-01-15'): boolean => {
    let initialDate = new Date(paramIni).setHours(0, 0, 0, 0);
    let finalDate = new Date(paramFinal).setHours(0, 0, 0, 0);
    return initialDate.valueOf() < finalDate.valueOf() ? false : true;
}


export const existItemInList = (list: any[]): boolean => {
    //Funciona semelhante ao includes, porem e mais eficiente com uma lista muito extensa de dados
    const listSet = new Set(list);
    return listSet.has('item');
}

export const numericOnly = (event: any): boolean => {
    const pattern = /^[0-9]*$/g;
    const result = pattern.test(event.key);
    return result;
}

export const existLocalStorage = (fileName: string): boolean => {
    if (!!localStorage.getItem(fileName)) {
        return true;
    }
    return false;
}

export const isStringHasNonAsciiCharacters = (text: string): boolean => {
    return /[\w\s\u00C0-\u017F]/gi.test(text);
}