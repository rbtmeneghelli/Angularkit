import { ContaService } from './../../app_business/service/conta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Conta } from 'src/app/app_entities/model/conta.model';

@Component({
    selector: 'app-conta-view',
    templateUrl: './conta-view.component.html'
})

export class ContaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    public conta: Conta = new Conta();
    constructor(
        private contaService: ContaService,
        private activatedRoute: ActivatedRoute) {
    }
    ngOnInit() {
        this.cardCabecalhoDTO.tituloCard = 'Formulario Conta';
        this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
        this.cardCabecalhoDTO.nomeTela = 'Conta';
        this.activatedRoute.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: number) {
        this.contaService.getById(id).pipe(take(1)).toPromise().then(response => {
            this.conta = response;
        }).catch(error => alert('erro'));
    }
}
