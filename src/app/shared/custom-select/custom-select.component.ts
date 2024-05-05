import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements AfterViewInit {

    public isMenuActive = false;
    public isBigMenu = false;
    isOpen: boolean = false;
    selectedOption: string | null = null;
    options: string[] = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];
    showList: boolean = false;
    selectedOptionIndex: number = -1;

    @ViewChild('selectItems') selectItemsRef!: ElementRef;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'position', 'absolute');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'background-color', '#fff');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'border', '1px solid #ccc');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'margin-left', '-13px');
        this.renderer.setStyle(this.selectItemsRef.nativeElement, 'outline', 'transparent');
    }

    toggleSelect() {
        this.isOpen = !this.isOpen;
        this.showList = this.isOpen;
        if (this.isOpen) {
            setTimeout(() => {
                this.selectItemsRef.nativeElement.focus();
            });
        }

        this.showListOptions();
    }

    showListOptions() {
        if (this.showList) {
            this.renderer.setStyle(this.selectItemsRef.nativeElement, 'display', 'block');
        } else {
            this.renderer.setStyle(this.selectItemsRef.nativeElement, 'display', 'none');
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                this.selectedOptionIndex = Math.max(0, this.selectedOptionIndex - 1);
                this.scrollIntoView();
                break;
            case "ArrowDown":
                event.preventDefault();
                this.selectedOptionIndex = Math.min(this.options.length - 1, this.selectedOptionIndex + 1);
                this.scrollIntoView();
                break;
        }
    }

    selectOption(index: number): void {
        this.selectedOptionIndex = index;
        this.showList = false;
        this.showListOptions();
    }

    scrollIntoView(): void {
        const selectedOption = this.selectItemsRef.nativeElement.querySelector('.selected');
        selectedOption.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
}

