import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

// Função que retorna o validador
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const urlRegex2 =
      /^(ftp|http|https):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;
    const urlRegex3 =
      /^(ftp|http|https):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w\-._~,!$&'()*+\|;=:]*)?(?:\?[a-zA-Z0-9\-._~,!$&'()*+\|;=\/%]*)?(?:#[\w\-._~,!$&'()*+\|:;=\/]*)?$/;
    const urlRegex4 =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (control.value && !urlRegex.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  };
}

// Aplicando Inicializa o formulário com validadores, incluindo o validador de URL personalizado
// this.formulario = this.fb.group({
//     url: ['', [Validators.required, urlValidator()]]
//   });

export const validateURL = (url: string): boolean => {
  const regexUrl =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  if (url?.includes("https://") === false) {
    return false; //this.form.setErrors({ errorHttps: true });
  } else if (regexUrl.test(url)) {
    return true;
  } else {
    return false; // this.controlVendaDiretaLink.setErrors({ invalidLink: true });
  }
};
