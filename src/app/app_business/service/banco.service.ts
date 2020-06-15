import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Banco } from '../../app_entities/model/banco.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class BancoService extends BaseService<Banco> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}banco`);
    }
}
