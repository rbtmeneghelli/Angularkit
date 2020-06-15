import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseFormComponent implements OnInit {
    formulario: FormGroup;
    ngOnInit() {
    }
    abstract submit();
    OnSubmit() {
        if (this.formulario.valid) {
            this.submit();
        }
    }
    OnReset() {
        this.formulario.reset();
    }
}
