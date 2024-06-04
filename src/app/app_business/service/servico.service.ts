import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseService } from '../interface/base.service';
import { HttpClient } from '@angular/common/http';
import { Servico } from 'src/app/app_entities/model/servico.model';
import { Observable } from 'rxjs';

@Injectable()
export class ServicoService extends BaseService<Servico> {
    constructor(protected readonly http: HttpClient) {
        super(http, `${environment.API}servico`);
    }

    getUserIpAddress(): Observable<string> {
        return this.http.get<string>("http://api.ipify.org/?format=json", { headers: this.getOptions() });
    }
}
