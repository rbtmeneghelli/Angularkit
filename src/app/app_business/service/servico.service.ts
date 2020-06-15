import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';
import { Servico } from 'src/app/app_entities/model/servico.model';

@Injectable()
export class ServicoService extends BaseService<Servico> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}servico`);
    }
}
