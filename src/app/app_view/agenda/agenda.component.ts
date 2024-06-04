import { hasErrorFormControl } from './../../app_business/shared/shared-functions-string';
import { AgendaService } from './../../app_business/service/agenda.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { Agenda } from 'src/app/app_entities/model/agenda.model';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html'
})

export class AgendaComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Agenda','Cadastro','Agenda');
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: arrDropDownList = statusList;
  public bloquearCampo: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public readonly agendaService: AgendaService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedNotificationService: SharedNotificationService
  ) {
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', [Validators.required]],
      LOCAL: ['', Validators.required],
      DATA: ['', Validators.required],
      HORA: ['', Validators.required],
      ALERTA: [''],
      STATUS: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!!params.id) {
        this.updateForm(params.id);
      } else {
        this.registroNovo = true;
        this.bloquearCampo = false;
      }
    });
  }

  updateForm(id: number) {
    this.agendaService.getById(id).pipe(take(1)).subscribe(response => {
      this.formulario.get('ID').setValue(id);
      this.formulario.get('DESCRICAO').setValue(response.descricao);
      this.formulario.get('LOCAL').setValue(response.local);
      this.formulario.get('DATA').setValue(response.data);
      this.formulario.get('HORA').setValue(response.hora);
      this.formulario.get('ALERTA').setValue(response.alert);
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    });
  }

  buildEntity(): Agenda {
    const agenda: Agenda = new Agenda();
    agenda.descricao = this.formulario.get('DESCRICAO').value;
    agenda.local = this.formulario.get('LOCAL').value;
    agenda.data = SharedVariables.CURRENT_DATE;
    agenda.hora = this.formulario.get('HORA').value;
    agenda.alert = Boolean(this.formulario.get('ALERTA').value);
    agenda.status = this.formulario.get('STATUS').value === '0' ? false : true;
    if (this.registroNovo) {
      agenda.dataCriacao = SharedVariables.CURRENT_DATE;
    } else {
      agenda.dataAtualizacao = SharedVariables.CURRENT_DATE;
    }
    return agenda;
  }

  salvar() {
    if (this.registroNovo) {
      this.agendaService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'agenda cadastrado com sucesso', 'success', '/agenda');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar o novo agenda', 'error'));
    } else {
      this.agendaService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'agenda atualizado com sucesso', 'success', '/agenda');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao atualizar os dados do agenda', 'error'));
    }
  }

  hasErrorFormControl(formControl: AbstractControl): string{
    return hasErrorFormControl(formControl);
  }

  chkboxAlerta(checked) {
    if (checked) {
      this.formulario.get('ALERTA').setValue(false);
    } else {
      this.formulario.get('ALERTA').setValue(true);
    }
  }
}
