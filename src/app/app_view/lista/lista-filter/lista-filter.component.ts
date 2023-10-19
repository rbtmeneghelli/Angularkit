import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-lista-filter',
    templateUrl: './lista-filter.component.html'
})
export class ListaFilterComponent implements OnInit {

    @Output() filter = new EventEmitter();
    
    constructor() { }

    ngOnInit(): void {
    }

    async sendFilter(): Promise<void> {
        this.filter.emit();
    }

    async clearFilter(): Promise<void> {
    }
}
