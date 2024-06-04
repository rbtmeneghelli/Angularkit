import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.guard.service';
@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.css']
})

export class AppFooterComponent implements OnInit {
    versao: string = environment.version;
    constructor(private readonly authService: AuthService) { }

    ngOnInit() {
    }

    hasRole(role: string): boolean {
        return this.authService.hasRole(role);
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
