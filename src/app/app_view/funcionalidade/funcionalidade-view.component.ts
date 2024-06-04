import { FuncionalidadeService } from './../../app_business/service/funcionalidade.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Funcionalidade } from 'src/app/app_entities/model/funcionalidade.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
    selector: 'app-funcionalidade-view',
    templateUrl: './funcionalidade-view.component.html'
})

export class FuncionalidadeViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Funcionalidade','Cadastro','Funcionalidade');
    public funcionalidade: Funcionalidade = new Funcionalidade();
    constructor(
        private readonly funcionalidadeService: FuncionalidadeService,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.load(params.id);
        });
    }

    load(id: number) {
        this.funcionalidadeService.getById(id).pipe(take(1)).toPromise().then(response => {
            this.funcionalidade = response;
        }).catch(error => alert('erro'));
    }
}

