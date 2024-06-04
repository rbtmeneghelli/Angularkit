import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.guard.service';
import { SharedVariables } from '../app_entities/shared/shared-variables';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService, 
        private readonly router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    private isTokenExpired(): boolean {
        const token = this.authService.credencial.token;
        const payload = this.authService.getTokenData(token);
        const now = SharedVariables.CURRENT_DATE.getTime() / 1000;
        if (payload.exp < now) {
            return true;
        }
        return false;
    }
}
