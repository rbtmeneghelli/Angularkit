import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

// Função que retorna o validador
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const urlRegex2 = /^(ftp|http|https):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
    const urlRegex3 = /^(ftp|http|https):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w\-._~,!$&'()*+\|;=:]*)?(?:\?[a-zA-Z0-9\-._~,!$&'()*+\|;=\/%]*)?(?:#[\w\-._~,!$&'()*+\|:;=\/]*)?$/;
    if (control.value && !urlRegex.test(control.value)) {
      return { 'invalidUrl': true };
    }
    return null;
  };
}

// Aplicando Inicializa o formulário com validadores, incluindo o validador de URL personalizado
// this.formulario = this.fb.group({
//     url: ['', [Validators.required, urlValidator()]]
//   });

export function ValidarSelect(control: AbstractControl) {
  if (control.value === '0') {
      return { selectValido: true };
  }
  return null;
}

export function hexadecimalColor(control: AbstractControl) {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;

  if (control?.value?.length === 0 || control?.value === undefined) return null;
  return regex.test(control.value) ? null : { invalid: true };
}

export function noWhitespaceValidator(control: AbstractControl) {
  if (control?.value?.length === 0 || control?.value === undefined) return null;
  return (control.value || '')?.trim().length ? null : { invalid: true };
}

