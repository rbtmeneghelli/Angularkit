import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { arrString } from 'src/app/app_business/shared/shared-types';

@Component({
    selector: 'generic-mult-checkbox',
    templateUrl: './generic-mult-checkbox.component.html',
    styleUrls: ['./generic-mult-checkbox.component.scss'],
})

export class GenericMultCheckboxComponent {

    // Para testar, fazer o seguinte passo
    // checkboxOptions >> ['Pessoa Juridica', 'Pessoa Fisica']
    // o control e um formControl do FormGroup com valor passado como Array Booleano
    // [false,true] >> Isso dentro do value do formControl
    
    @Input() checkboxOptions: arrString = [];
    @Input() titulo: string = '';
    @Input() disabled: boolean = false;
    @Input() control: AbstractControl = new FormControl([]);

    ngOnInit() { }

    toggleCheckbox(index: number): void {
        const arr = this.control.value as boolean[];
        arr[index] = !arr[index];
        this.control.setValue(arr);
    }

    getControl(index: number) {
        return (this.control as FormArray).at(index) as FormControl;
    }
}