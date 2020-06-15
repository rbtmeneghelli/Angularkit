import { Servico } from './../../app_entities/model/servico.model';
import { ServicoService } from './../../app_business/service/servico.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-servico-view',
  templateUrl: './servico-view.component.html'
})

export class ServicoViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public servico: Servico = new Servico();
  constructor(
    private servicoService: ServicoService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Serviço';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Serviço';
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

