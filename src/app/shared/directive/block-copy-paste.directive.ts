import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockCopyPaste]'
})
export class BlockCopyPasteDirective {

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }
}

// How to use directive to block cut, copy and paste from keyboard
// Link: https://stackoverflow.com/questions/47384952/directive-to-disable-cut-copy-and-paste-function-for-textbox-using-angular2
/* <ion-input appBlockCopyPaste formControlName="confirmpass" type="tel"></ion-input> */
