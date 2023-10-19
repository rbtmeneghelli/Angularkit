import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class BaseFormComponent<TService> implements OnInit {

    protected formulario: FormGroup;

    constructor(
        protected _service: TService
    )
    {
    }

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
