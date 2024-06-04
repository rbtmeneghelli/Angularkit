import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.guard.service';
import { SharedService } from '../app_business/service/shared.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService, 
        private readonly router: Router, 
        private readonly sharedService: SharedService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        const role = next.data.roles as string;

        if (this.authService.hasRole(role)) {
            return true;
        } else {
            this.sharedService.enviarNotificacaoToRoute('Acesso negado', 'Você não possui acesso a este recurso!', 'error', 'home');
            return false;
        }
    }
}
