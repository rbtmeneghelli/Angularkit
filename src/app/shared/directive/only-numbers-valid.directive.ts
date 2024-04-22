import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { SharedService } from 'src/app/app_business/service/shared.service';

@Directive({ selector: '[onlyNumbersValid]', })

export class OnlyNumbersValidDirective {

    constructor(
        private _el: ElementRef, @Optional()
        private ngModel: NgModel, @Optional()
        private fieldControl: NgControl) { }

    @HostListener('input', ['$event']) onInputChange(event) {

        const initalValue = this.ngModel !== null ? this.ngModel.value : this.fieldControl.control.value;

        if (this.fieldControl !== null) {
            this.fieldControl.control.setValue(SharedService.somenteNumerosValidos(initalValue));
            if (initalValue !== this.fieldControl.value) {
                event.stopPropagation();
            }
        }

        if (this.ngModel !== null) {
            this.ngModel.viewToModelUpdate(SharedService.somenteNumerosValidos(initalValue));
            if (initalValue !== this.fieldControl.value) {
                event.stopPropagation();
            }
        }
    }
}