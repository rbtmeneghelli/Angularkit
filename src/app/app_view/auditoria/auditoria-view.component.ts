import { AuditoriaService } from './../../app_business/service/auditoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Auditoria } from '../../app_entities/model/auditoria.model';

@Component({
    selector: 'app-auditoria-view',
    templateUrl: './auditoria-view.component.html'
})

export class AuditoriaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    public auditoria: Auditoria = new Auditoria();
    constructor(
        private auditoriaService: AuditoriaService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.cardCabecalhoDTO.tituloCard = 'Formulario Auditoria';
        this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
        this.cardCabecalhoDTO.nomeTela = 'Auditoria';
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

