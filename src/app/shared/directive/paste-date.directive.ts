import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: 'input[type=date][ngModel], input[type=date][formControl], input[type=date][formControlName]'
})

export class PasteDateDirective {

    @Output() result = new EventEmitter();

    private regexToValidateDate = new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$');

    constructor(private readonly _ElementRef: ElementRef) { }

    @HostListener('paste', ['$event']) OnPaste($event) {

        let inputedDateByUser = $event.clipboardData.getData('text');

        if (this.regexToValidateDate.test(inputedDateByUser)) {
            this.result.emit({ isvalidDate: true, date: this.convertStringToDate(inputedDateByUser) });
        } else {
            this.result.emit({ isvalidDate: false, dateValue: '' });
        }
    }

    private convertStringToDate(dateValue: string): string {
        return dateValue.split("/").reverse().join("-");
    }
}