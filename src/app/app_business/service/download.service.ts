import { catchError, map } from 'rxjs/operators';
import { SharedService } from 'src/app/app_business/service/shared.service';
import { Observable, EMPTY } from 'rxjs';
import { FiltroArquivo } from './../../app_entities/generic/filtro-arquivo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { arrString } from '../shared/shared-types';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class DownloadService {

    constructor(
        private readonly http: HttpClient, 
        private readonly sharedService: SharedService
    ) {
    }

    getFilesToZip(diretorios: FiltroArquivo): Observable<arrString> {
        return this.http.post<arrString>(`${environment.API}/home/filesToZip`, JSON.stringify(diretorios), httpOptions).pipe(
            map(response => response),
            catchError(error => this.errorHandle(error))
        );
    }

    errorHandle(e: any): Observable<any> {
        this.sharedService.enviarNotificacaoSnackBar('Ocorreu um erro', true);
        return EMPTY;
    }
}
