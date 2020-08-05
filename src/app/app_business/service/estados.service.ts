import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from "../interface/base.service";
import { Estados } from "../../app_entities/model/estados.model";


@Injectable({
    providedIn: 'root'
})

export class EstadosService extends BaseService<Estados> {

    constructor(http: HttpClient) {
        super(http, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    }
}
