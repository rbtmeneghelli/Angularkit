import { Cliente } from '../../app_entities/model/cliente.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClienteService extends BaseService<Cliente> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}cliente`);
    }
}
