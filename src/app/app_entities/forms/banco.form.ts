import { FormControl, FormGroup, Validators } from '@angular/forms';

export const FORMULARIO_BANCO = new FormGroup({
    ID: new FormControl(['']),
    NOMEBANCO: new FormControl(['', Validators.required]),
    URL: new FormControl(['', Validators.required]),
    LOGIN: new FormControl(['', Validators.required]),
    SENHA: new FormControl(['', Validators.required]),
    CREDITO: new FormControl([0, Validators.required]),
    DEBITO: new FormControl([0, Validators.required]),
    STATUS: new FormControl(['', Validators.required]),
});
 

