import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[contaMask]'
})

export class ContaMaskDirective {

    constructor(private el: ElementRef) { }

    @HostListener('keyup', ['$event'])
    onkeyup(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;
        const trimmedValue = input.value.replace(/\D/g, '');

        if (event.key === 'Backspace') {
            input.value = this.getFormattedText(trimmedValue);
        } else if (trimmedValue?.length > 0) {
            const inputValue = trimmedValue.padStart(10, '0');
            input.value = this.getFormattedText(inputValue);
        }
    }

    private getFormattedText(inputValue: string): string {
        let formattedText = '';

        for (let i = 0; i < inputValue.length; i++) {

            if (i === 13) {
                formattedText += '-' + inputValue.charAt(i);
            } else {
                formattedText += inputValue.charAt(i);
            }
        }

        return formattedText;
    }
}