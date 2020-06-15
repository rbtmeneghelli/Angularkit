import { Observable } from 'rxjs';
import { FiltroArquivo } from './../../app_entities/generic/filtro-arquivo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class DownloadService {

    constructor(protected http: HttpClient) {
    }

    getFilesToZip(diretorios: FiltroArquivo): Observable<string[]> {
        return this.http.post<string[]>(`${environment.API}/home/filesToZip`, JSON.stringify(diretorios), httpOptions);
    }
}
