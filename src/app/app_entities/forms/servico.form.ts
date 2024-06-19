import { FormControl, FormGroup, Validators } from "@angular/forms";

export const FORMULARIO_SERVICO = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', Validators.required]),
    TIPOSERVICO: new FormControl(['', Validators.required]),
    STATUS: new FormControl(['', Validators.required]),
});

