import { Funcionalidade } from './../../app_entities/model/funcionalidade.model';
import { FuncionalidadeService } from './../../app_business/service/funcionalidade.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';

@Component({
  selector: 'app-funcionalidade',
  templateUrl: './funcionalidade.component.html'
})

export class FuncionalidadeComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Funcionalidade', 'Cadastro', 'Funcionalidade');
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: arrDropDownList = statusList;
  public bloquearCampo: boolean;
  constructor(
    private readonly sharedService: SharedService,
    private formBuilder: FormBuilder,
    public readonly funcionalidadeService: FuncionalidadeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedNotificationService: SharedNotificationService
  ) {
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', Validators.required],
      ROLE: ['', Validators.required],
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
    this.funcionalidadeService.getById(id).pipe(take(1)).subscribe(response => {
      this.formulario.get('ID').setValue(id);
      this.formulario.get('DESCRICAO').setValue(response.descricao);
      this.formulario.get('ROLE').setValue(response.role);
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    });
  }

  buildEntity(): Funcionalidade {
    const funcionalidade: Funcionalidade = new Funcionalidade();
    funcionalidade.descricao = this.formulario.get('DESCRICAO').value;
    funcionalidade.role = this.formulario.get('ROLE').value;
    funcionalidade.status = true;
    if (this.registroNovo) {
      funcionalidade.dataCriacao = SharedVariables.CURRENT_DATE;
    } else {
      funcionalidade.dataAtualizacao = SharedVariables.CURRENT_DATE;
    }
    return funcionalidade;
  }

  salvar() {
    if (this.registroNovo) {
      this.funcionalidadeService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'funcionalidade cadastrado com sucesso', 'success', '/funcionalidade');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar a nova funcionalidade', 'error'));
    } else {
      this.funcionalidadeService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'funcionalidade atualizado com sucesso', 'success', '/funcionalidade');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar a nova funcionalidade', 'error'));
    }
  }

  hasErrorFormControl(formControl: AbstractControl): string{
    return hasErrorFormControl(formControl);
  }
}
