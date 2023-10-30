import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[cepMask]'
})

export class CepMaskDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const trimmedValue = input.value.replace(/\D/g, '');

        if (trimmedValue.length > 0) {
            let formattedValue = trimmedValue.substring(0, 5);
            if (trimmedValue.length >= 6) {
                formattedValue += '-' + trimmedValue.substring(5, 8);
            }
            input.value = formattedValue;
        } else {
            input.value = '';
        }
    }
}
