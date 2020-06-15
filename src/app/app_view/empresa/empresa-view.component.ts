import { EmpresaService } from './../../app_business/service/empresa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Empresa } from '../../app_entities/model/empresa.model';

@Component({
    selector: 'app-empresa-view',
    templateUrl: './empresa-view.component.html'
})

export class EmpresaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    public empresa: Empresa = new Empresa();
    constructor(
        private empresaService: EmpresaService,
        private activatedRoute: ActivatedRoute) {
    }
    ngOnInit() {
        this.cardCabecalhoDTO.tituloCard = 'Formulario Empresa';
        this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
        this.cardCabecalhoDTO.nomeTela = 'Empresa';
        this.activatedRoute.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: number) {
        this.empresaService.getById(id).pipe(take(1)).toPromise().then(response => {
            this.empresa = response;
        }).catch(error => alert('erro'));
    }
}

