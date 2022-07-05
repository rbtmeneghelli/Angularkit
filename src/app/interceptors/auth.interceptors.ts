import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../app_business/service/shared.service';
import { AuthService } from '../guards/auth.guard.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private spCharactersStringList: any = ['%b%', '%j%', '%u%'];
    private spCharactersB64List: any = [btoa('%b%'), btoa('%j%'), btoa('%u%')];
    private responseMethodsList: string[] = ['POST', 'PUT', 'DELETE'];
    private arrKeysToTradeDbQuote: string[] = ['specialField'];

    constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):

        Observable<HttpEvent<any>> {
        return next.handle(this.interceptorRequest(req)).pipe(
            map(event => this.interceptorResponse(event)),
            catchError(e => {
                if (e.status === 401) {
                    if (this.authService.isAuthenticated()) {
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

    private interceptorRequest(request: HttpRequest<any>): HttpRequest<any> {
        if (this.responseMethodsList.includes(request.method)) {
            for (var key in request.body) {
                if (typeof request.body[key] === 'string' && !!request.body[key]) {
                    this.spCharactersStringList.forEach(spCharacter => {
                        if (request.body[key]?.indexOf(spCharacter) !== -1) {
                            request.body[key] = request.body[key].replace(new RegExp(spCharacter, "g"), btoa(spCharacter));
                        }
                    });
                }
            }
        }
        return request;
    }

    private interceptorResponse(event: HttpEvent<any>): HttpResponse<any> {
        if (event instanceof HttpResponse) {
            for (var key in event.body?.data) {
                if (typeof event.body.data[key] === 'string' && !!event.body.data[key]) {
                    this.spCharactersB64List.forEach(spCharacter => {
                        if (event.body.data[key]?.indexOf(spCharacter) !== -1) {
                            event.body.data[key] = event.body.data[key].replace(new RegExp(spCharacter, "g"), atob(spCharacter));
                        }
                    });
                }
            }
            return event;
        }
    }

    private isarrKeysToTradeDbQuote(key: string): boolean {
        return this.arrKeysToTradeDbQuote.some(x => x?.toUpperCase() === key?.toUpperCase());
    }

    private replaceDbQuoteBracketBtoa(data: string) {
        const spCharacterList: any[] = ["“", "”", '(', ')'];
        spCharacterList.forEach(spCharacter => {
            if (spCharacter !== spCharacterList[2] && spCharacter !== spCharacterList[3]) {
                data = data.replace(new RegExp(spCharacter, "g"), btoa(unescape(encodeURIComponent(spCharacter))));
            }
            else if (spCharacter === spCharacterList[2]) {
                data = data.replace(/\(/g, btoa(spCharacter));
            }
            else if (spCharacter === spCharacterList[3]) {
                data = data.replace(/\)/g, btoa(spCharacter));
            }
        });
        return data;
    }

    private replaceDbQuoteBracketAtob(data: string) {
        const spCharacterList: any[] = [btoa(unescape(encodeURIComponent("“"))), btoa(unescape(encodeURIComponent("”"))),
        btoa(unescape(encodeURIComponent("("))), btoa(unescape(encodeURIComponent(")")))];
        spCharacterList.forEach(spCharacter => {
            data = data.replace(new RegExp(spCharacter, "g"), decodeURIComponent(escape(atob(spCharacter))));
        });

        return data;
    }
}
