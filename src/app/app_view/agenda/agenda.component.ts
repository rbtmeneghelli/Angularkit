import { AgendaService } from './../../app_business/service/agenda.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { take } from 'rxjs/operators';
import { Agenda } from 'src/app/app_entities/model/agenda.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html'
})

export class AgendaComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: Array<DropDownList>;
  public bloquearCampo: boolean;
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public agendaService: AgendaService,
    private activatedRoute: ActivatedRoute) {
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', Validators.required],
      LOCAL: ['', Validators.required],
      DATA: ['', Validators.required],
      HORA: ['', Validators.required],
      ALERTA: [''],
      STATUS: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Agenda';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Agenda';
    this.listaStatus = this.sharedService.getListaStatus();
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== undefined && params.id !== null) {
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
    agenda.data = new Date();
    agenda.hora = this.formulario.get('HORA').value;
    agenda.alert = Boolean(this.formulario.get('ALERTA').value);
    agenda.status = this.formulario.get('STATUS').value === '0' ? false : true;
    if (this.registroNovo) {
      agenda.dataCriacao = new Date();
    } else {
      agenda.dataAtualizacao = new Date();
    }
    return agenda;
  }

  salvar() {
    if (this.registroNovo) {
      this.agendaService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedService.enviarNotificacaoToRoute('', 'agenda cadastrado com sucesso', 'success', '/agenda');
      }).catch(error => this.sharedService.enviarNotificacao('', 'Erro ao cadastrar o novo agenda', 'error'));
    } else {
      this.agendaService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedService.enviarNotificacaoToRoute('', 'agenda atualizado com sucesso', 'success', '/agenda');
      }).catch(error => this.sharedService.enviarNotificacao('', 'Erro ao atualizar os dados do agenda', 'error'));
    }
  }

  getDescricao() {
    return this.formulario.get('DESCRICAO').hasError('required') ? 'O campo descrição é obrigatório' : '';
  }

  getStatus() {
    return this.formulario.get('STATUS').hasError('required') ? 'O campo status é obrigatório' : '';
  }

  chkboxAlerta(checked) {
    if (checked) {
      this.formulario.get('ALERTA').setValue(false);
    } else {
      this.formulario.get('ALERTA').setValue(true);
    }
  }
}
