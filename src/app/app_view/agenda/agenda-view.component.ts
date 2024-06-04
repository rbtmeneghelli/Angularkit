import { AgendaService } from './../../app_business/service/agenda.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Agenda } from '../../app_entities/model/agenda.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
  selector: 'app-agenda-view',
  templateUrl: './agenda-view.component.html'
})

export class AgendaViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Agenda','Cadastro','Agenda');
  public agenda: Agenda = new Agenda();
  constructor(
    private readonly agendaService: AgendaService,
    private readonly activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
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

