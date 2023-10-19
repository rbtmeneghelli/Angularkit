import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-filter',
    templateUrl: './card-filter.component.html',
    styleUrls: ['./card-filter.component.scss']
})

export class CardFilterComponent implements OnInit {

    public isMenuActive = false;
    public isBigMenu = false;

    constructor() { }

    ngOnInit(): void {
    }

    showMenu(active: boolean, isBigMenu: boolean = false): void {
        this.isMenuActive = active;
        this.isBigMenu = isBigMenu;
    }

    closeFilter(): void {
        this.showMenu(false);
    }
}