import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card-error',
    templateUrl: './card-error.component.html',
    styleUrls: ['./card-error.component.scss']
})

export class CardErrorComponent implements OnInit {

    constructor(private readonly route: Router) { }

    ngOnInit(): void {
    }

    voltar(): void {
        this.route.navigate(['/']);
    }
}
