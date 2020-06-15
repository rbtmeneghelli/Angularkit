import { Auditoria } from './../../app_entities/model/auditoria.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuditoriaService extends BaseService<Auditoria> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}auditoria`);
    }
}
