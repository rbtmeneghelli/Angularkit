import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ArquivoDTO } from '../../app_entities/dto/arquivo.dto';
import { environment } from '../../../environments/environment';

type EntityResponseType = HttpResponse<ArquivoDTO>;

@Injectable({
    providedIn: 'root'
})
export class ArquivoService {
    private API: string;
    constructor(private http: HttpClient, private sharedService: SharedService) {
        this.API = '/api/arquivo';
    }

    public sendFile(arquivo: ArquivoDTO, file: File) {
        const inputMultiPart = new FormData();
        inputMultiPart.append('file', file);
        inputMultiPart.append('json', this.sharedService.objetoParaString(arquivo));
        return this.http.post(`${environment.API} + ${this.API}`, inputMultiPart, { headers: { Accept: 'application/json' } }).pipe(
            map(response => response),
            catchError(e => {
                let msg = '';
                if (e.message) {
                    msg = e.message;
                }
                this.sharedService.enviarNotificacao('Erro para efetuar o upload do arquivo', msg, 'error');
                return throwError(e);
            })
        );
    }
}
