import { ContaService } from './../../app_business/service/conta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Conta } from 'src/app/app_entities/model/conta.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
    selector: 'app-conta-view',
    templateUrl: './conta-view.component.html'
})

export class ContaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Conta','Cadastro','Conta');
    public conta: Conta = new Conta();
    constructor(
        private readonly contaService: ContaService,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }
    ngOnInit() {
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
