import { AuditoriaService } from './../../app_business/service/auditoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Auditoria } from '../../app_entities/model/auditoria.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
    selector: 'app-auditoria-view',
    templateUrl: './auditoria-view.component.html'
})

export class AuditoriaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Auditoria','Cadastro','Auditoria');
    public auditoria: Auditoria = new Auditoria();
    constructor(
        private readonly auditoriaService: AuditoriaService,
        private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: number) {
        this.auditoriaService.getById(id).pipe(take(1)).toPromise().then(response => {
            this.auditoria = response;
        }).catch(error => alert('erro'));
    }
}

