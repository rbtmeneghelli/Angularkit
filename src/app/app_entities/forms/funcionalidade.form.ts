import { FormControl, FormGroup, Validators } from "@angular/forms";

export const FORMULARIO_FUNCIONALIDADE = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', Validators.required]),
    ROLE: new FormControl(['', Validators.required]),
});

