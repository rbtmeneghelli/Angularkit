import { EmpresaService } from './../../app_business/service/empresa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Empresa } from '../../app_entities/model/empresa.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
    selector: 'app-empresa-view',
    templateUrl: './empresa-view.component.html'
})

export class EmpresaViewComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Empresa','Cadastro', 'Empresa');
    public empresa: Empresa = new Empresa();
    constructor(
        private readonly empresaService: EmpresaService,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }
    ngOnInit() {
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

