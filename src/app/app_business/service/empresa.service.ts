import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from 'src/app/app_entities/model/empresa.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class EmpresaService extends BaseService<Empresa> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}empresa`);
    }
}
