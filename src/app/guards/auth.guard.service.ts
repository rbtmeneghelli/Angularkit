import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredenciaisDTO } from '../app_entities/dto/credencial.dto';
import { SharedService } from '../app_business/service/shared.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private credencialModel: CredenciaisDTO;

    constructor(private httpClient: HttpClient, private sharedService: SharedService, private router: Router) { }

    public get credencial(): CredenciaisDTO {
        if (this.credencialModel != null) {
            return this.credencialModel;

        } else if (this.credencialModel == null && sessionStorage.getItem('usuarioLogado') != null) {
            this.credencialModel = JSON.parse(sessionStorage.getItem('usuarioLogado')) as CredenciaisDTO;
            return this.credencialModel;
        }
        return new CredenciaisDTO();
    }

    public doLogin(credencial: CredenciaisDTO): Observable<any> {
        return this.httpClient.post<any>(environment.API + 'Seguranca', credencial);
    }

    public keepUser(accessToken: string): void {
        const payload = this.getTokenData(accessToken);
        this.credencialModel = new CredenciaisDTO();
        this.credencialModel.login = payload.user_name;
        // this.credencialModel.roles = payload.authorities;
        sessionStorage.setItem('usuarioLogado', JSON.stringify(this.credencialModel));
    }

    public keepUserData(credencial: CredenciaisDTO) {
        const payload = this.getTokenData(credencial.token);
        this.credencialModel = new CredenciaisDTO();
        this.credencialModel.login = credencial.login;
        this.credencialModel.senha = credencial.senha;
        this.credencialModel.perfil = credencial.perfil;
        this.credencialModel.roles = credencial.roles;
        this.credencialModel.token = credencial.token;
        sessionStorage.setItem('usuarioLogado', JSON.stringify(this.credencialModel));
    }

    public getTokenData(accessToken: string): any {
        if (accessToken != null) {
            return JSON.parse(this.sharedService.b64DecodeUnicode(accessToken.split('.')[1]));
        }
        return null;
    }

    public isAuthenticated(): boolean {
        const payload = this.getTokenData(this.credencial.token);
        if (payload !== null && payload !== undefined) {
            return true;
        }
        return false;
    }

    public logout(): void {
        this.credencialModel = new CredenciaisDTO();
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    public hasRole(role: string): boolean {
        if (this.credencial.roles && this.credencial.roles.includes(role)) {
            return true;
        }
        return false;
    }
}
