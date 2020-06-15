import { BancoService } from '../../app_business/service/banco.service';
import { Banco } from '../../app_entities/model/banco.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-banco-view',
  templateUrl: './banco-view.component.html'
})

export class BancoViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public banco: Banco = new Banco();
  constructor(
    private bancoService: BancoService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Banco';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Banco';
    this.activatedRoute.params.subscribe(params => {
      this.load(params.id);
    });
  }

  load(id: number) {
    this.bancoService.getById(id).pipe(take(1)).subscribe(response => {
      this.banco = response;
    });
  }
}

