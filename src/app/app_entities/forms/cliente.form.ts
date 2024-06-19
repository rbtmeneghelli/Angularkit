import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

const validarCpf = (controle: AbstractControl) => {
    let soma: number;
    let resto: number;
    let cpf = controle.value;

    if (cpf === undefined) {
      return { cpfInvalido: true };
    } else if (cpf === '' || cpf === null) {
      return { cpfInvalido: true };
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    soma = 0;
    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) {
      return { cpfInvalido: true };
    } else {
      for (let i = 1; i <= 9; i++) {
        // tslint:disable-next-line: radix
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      // tslint:disable-next-line: radix
      if (resto !== parseInt(cpf.substring(9, 10))) {
        return { cpfInvalido: true };
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        // tslint:disable-next-line: radix
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      // tslint:disable-next-line: radix
      if (resto !== parseInt(cpf.substring(10, 11))) {
        return { cpfInvalido: true };
      }
      return null;
    }
}

export const FORMULARIO_CLIENTE = new FormGroup({
    ID: new FormControl(['']),
    CPF: new FormControl(['', [Validators.required, validarCpf]]),
    NOME: new FormControl(['', Validators.required]),
    STATUS: new FormControl(['', Validators.required]),
});


 

