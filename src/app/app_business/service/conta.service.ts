import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';
import { Conta } from '../../app_entities/model/conta.model';

@Injectable()
export class ContaService extends BaseService<Conta> {
    constructor(http: HttpClient) {
        super(http, `${environment.API}conta`);
    }
}


