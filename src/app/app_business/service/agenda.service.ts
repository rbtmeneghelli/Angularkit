import { Agenda } from './../../app_entities/model/agenda.model';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgendaService extends BaseService<Agenda> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}agenda`);
    }
}
