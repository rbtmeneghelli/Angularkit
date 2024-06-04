import { EnumTipoServico } from './../../app_entities/enum/EnumTipoServico';
import { Servico } from './../../app_entities/model/servico.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { ServicoService } from '../../app_business/service/servico.service';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html'
})

export class ServicoComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Serviço','Cadastro','Serviço');
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: arrDropDownList = statusList;
  public bloquearCampo: boolean;
  public eTipoServico = EnumTipoServico;
  public keys: any[];
  constructor(
    private readonly sharedService: SharedService,
    private readonly formBuilder: FormBuilder,
    public readonly servicoService: ServicoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedNotificationService: SharedNotificationService
  ) {
    this.keys = Object.keys(this.eTipoServico).filter(k => !isNaN(Number(k)));
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', Validators.required],
      TIPOSERVICO: ['', Validators.required],
      STATUS: ['', Validators.required],
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
      servico.dataCriacao = SharedVariables.CURRENT_DATE;
    } else {
      servico.dataAtualizacao = SharedVariables.CURRENT_DATE;
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

  hasErrorFormControl(formControl: AbstractControl): string{
    return hasErrorFormControl(formControl);
  }
}
