import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.guard.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})

export class AppHeaderComponent implements OnInit {

    constructor(private readonly authService: AuthService) { }

    ngOnInit() {
    }

    Logout() {
        this.authService.logout();
    }

    hasRole(role: string): boolean {
        return this.authService.hasRole(role);
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
