import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../app/login/login-sistema/auth.service';
import { SharedService } from '../app_business/service/shared.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):

        Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(e => {
                if (e.status === 401) {
                    if (this.authService.usuarioEstaAutenticado()) {
                        this.authService.logout();
                    }
                    this.router.navigate(['/login']);
                }

                if (e.status === 403) {
                    // tslint:disable-next-line: max-line-length
                    this.sharedService.enviarNotificacaoToRoute('Acesso negado', 'Você não possui acesso a este recurso', 'warning', 'home');
                }

                return throwError(e);
            })
        );
    }
}
