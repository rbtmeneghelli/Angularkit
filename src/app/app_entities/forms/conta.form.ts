import { FormControl, FormGroup, Validators } from '@angular/forms';

export const FORMULARIO_CONTA = new FormGroup({
    ID: new FormControl(['']),
    CPF: new FormControl(['', Validators.required]),
    NOME: new FormControl(['', Validators.required]),
    STATUS: new FormControl(['', Validators.required]),
});
 