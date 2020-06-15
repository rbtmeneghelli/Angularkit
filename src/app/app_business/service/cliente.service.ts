import { Cliente } from '../../app_entities/model/cliente.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from '../interface/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { CredenciaisDTO } from '../../app_entities/dto/credencial.dto';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ClienteService extends BaseService<Cliente> {

    constructor(http: HttpClient) {
        super(http, `${environment.API}cliente`);
    }

    carregaCargos() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const authToken: CredenciaisDTO = JSON.parse(localStorage.getItem('usuarioLogado')) as CredenciaisDTO;
        headers.append('Authorization', `Bearer ${authToken.token}`);
        return this.http.get(environment.API + '/dashboard/home', { headers }).pipe(take(1)).subscribe(response => {
        }, errors => console.log('error'));
    }

    carregaCargos2(): Observable<Cliente> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const authToken: CredenciaisDTO = JSON.parse(localStorage.getItem('usuarioLogado')) as CredenciaisDTO;
        headers.append('Authorization', `Bearer ${authToken.token}`);
        return this.http.get<Cliente>(environment.API + '/dashboard/home', { headers }).pipe(take(1),
            catchError(e => {
                if (e.error.errors) {
                }
                return throwError(e);
            })
        );
    }
}
