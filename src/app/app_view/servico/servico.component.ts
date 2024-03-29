import { EnumTipoServico } from './../../app_entities/enum/EnumTipoServico';
import { Servico } from './../../app_entities/model/servico.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { take } from 'rxjs/operators';
import { ServicoService } from '../../app_business/service/servico.service';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html'
})

export class ServicoComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: Array<DropDownList>;
  public bloquearCampo: boolean;
  public eTipoServico = EnumTipoServico;
  public keys: any[];
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public servicoService: ServicoService,
    private activatedRoute: ActivatedRoute,
    private sharedNotificationService: SharedNotificationService) {
    this.keys = Object.keys(this.eTipoServico).filter(k => !isNaN(Number(k)));
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', Validators.required],
      TIPOSERVICO: ['', Validators.required],
      STATUS: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Serviço';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Serviço';
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
    this.servicoService.getById(id).pipe(take(1)).subscribe(response => {
      this.formulario.get('ID').setValue(id);
      this.formulario.get('DESCRICAO').setValue(response.descricao);
      this.formulario.get('TIPOSERVICO').setValue(response.tipoServico.toString());
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    });
  }

  buildEntity(): Servico {
    const servico: Servico = new Servico();
    servico.descricao = this.formulario.get('DESCRICAO').value;
    servico.tipoServico = this.formulario.get('TIPOSERVICO').value;
    servico.status = (this.formulario.get('STATUS').value === '1' ? true : false);
    if (this.registroNovo) {
      servico.dataCriacao = new Date();
    } else {
      servico.dataAtualizacao = new Date();
    }
    return servico;
  }

  salvar() {
    if (this.registroNovo) {
      this.servicoService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'serviço cadastrado com sucesso', 'success', '/servico');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar a nova serviço', 'error'));
    } else {
      this.servicoService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'serviço atualizado com sucesso', 'success', '/servico');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar a nova serviço', 'error'));
    }
  }

  getDescricao() {
    return this.formulario.get('DESCRICAO').hasError('required') ? 'O campo nome do serviço é obrigatório' : '';
  }

  getTipoServico() {
    return this.formulario.get('TIPOSERVICO').hasError('required') ? 'O campo tipo serviço é obrigatório' : '';
  }

  getStatus() {
    return this.formulario.get('STATUS').hasError('required') ? 'O campo status é obrigatório' : '';
  }
}
