import { AgendaService } from './../../app_business/service/agenda.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Agenda } from '../../app_entities/model/agenda.model';

@Component({
  selector: 'app-agenda-view',
  templateUrl: './agenda-view.component.html'
})

export class AgendaViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public agenda: Agenda = new Agenda();
  constructor(
    private agendaService: AgendaService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Agenda';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Agenda';
    this.activatedRoute.params.subscribe(params => {
      this.load(params.id);
    });
  }

  load(id: number) {
    this.agendaService.getById(id).pipe(take(1)).toPromise().then(response => {
      this.agenda = response;
    }).catch(error => alert('erro'));
  }
}

