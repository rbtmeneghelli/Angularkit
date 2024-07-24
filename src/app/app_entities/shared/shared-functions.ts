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