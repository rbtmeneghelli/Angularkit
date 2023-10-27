import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[touchLeave]'
})

// Exemplo pra usar >> <div touchLeave (touchLeave)="ocultarDropDown()">
export class TouchLeaveDirective {
    @Output() touchLeave = new EventEmitter<void>();

    constructor(private el: ElementRef) { }

    @HostListener('touchend', ['$event'])
    onTouchEnd(event: TouchEvent): void {
        const target = event.target as HTMLElement;
        const htmlElement = document.documentElement;
        const documentRect = htmlElement.getBoundingClientRect();
        const rect = documentRect;
        // const rect = this.el.nativeElement.getBoundingClientRect();

        if (!rect || !target) {
            return;
        }

        const x = event.changedTouches[0].clientX;
        const y = event.changedTouches[0].clientY;

        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            this.touchLeave.emit();
        }
    }
}