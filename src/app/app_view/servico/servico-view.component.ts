import { Servico } from './../../app_entities/model/servico.model';
import { ServicoService } from './../../app_business/service/servico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
  selector: 'app-servico-view',
  templateUrl: './servico-view.component.html'
})

export class ServicoViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Serviço','Cadastro','Serviço');
  public servico: Servico = new Servico();

  constructor(
    private readonly servicoService: ServicoService,
    private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.load(params.id);
    });
  }

  load(id: number) {
    this.servicoService.getById(id).pipe(take(1)).toPromise().then(response => {
      this.servico = response;
    }).catch(error => alert('erro'));
  }
}

