import { Cliente } from '../../app_entities/model/cliente.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from '../interface/base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, catchError } from 'rxjs/operators';
import { CredenciaisDTO } from '../../app_entities/dto/credencial.dto';
import { ClienteFilterData } from 'src/app/app_entities/filter/cliente-filter-data';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ClienteService extends BaseService<Cliente> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}cliente`);
    }
}
