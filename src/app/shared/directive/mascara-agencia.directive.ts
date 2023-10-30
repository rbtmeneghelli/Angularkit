import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[agenciaMask]'
})

export class AgenciaMaskDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input', ['$event']) onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const trimmedValue = input.value.replace(/\D/g, '');

        if (trimmedValue.length > 0) {
            let formattedValue = trimmedValue.substring(0, 4);
            if (trimmedValue.length >= 5) {
                formattedValue += '-' + trimmedValue.substring(5, 4);
            }
            input.value = formattedValue;
        } else {
            input.value = '';
        }
    }
}
