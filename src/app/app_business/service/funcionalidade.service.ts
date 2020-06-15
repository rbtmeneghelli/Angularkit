import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';
import { Funcionalidade } from '../../app_entities/model/funcionalidade.model';

@Injectable()
export class FuncionalidadeService extends BaseService<Funcionalidade> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}funcionalidade`);
    }
}
