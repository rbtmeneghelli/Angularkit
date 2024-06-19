import { FormControl, FormGroup, Validators } from '@angular/forms';

export const FORMULARIO_AGENDA = new FormGroup({
    ID: new FormControl(['']),
    DESCRICAO: new FormControl(['', [Validators.required]]),
    LOCAL: new FormControl(['', Validators.required]),
    DATA: new FormControl(['', Validators.required]),
    HORA: new FormControl(['', Validators.required]),
    ALERTA: new FormControl(['']),
    STATUS: new FormControl(['', Validators.required])
});
