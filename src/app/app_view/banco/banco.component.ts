import { Banco } from '../../app_entities/model/banco.model';
import { BancoService } from '../../app_business/service/banco.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html'
})

export class BancoComponent extends BaseFormComponent implements OnInit {
  constructor(
    private readonly sharedService: SharedService,
    private formBuilder: FormBuilder,
    public readonly bancoService: BancoService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedNotificationService: SharedNotificationService) {
    super('Formulario Banco', 'Cadastro', 'Banco');
    this.formulario = this.formBuilder.group({
      ID: [''],
      NOMEBANCO: ['', Validators.required],
      URL: ['', Validators.required],
      LOGIN: ['', Validators.required],
      SENHA: ['', Validators.required],
      CREDITO: [0, Validators.required],
      DEBITO: [0, Validators.required],
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
    this.bancoService.getById(id).pipe(take(1)).toPromise().then(response => {
      this.formulario.get('ID').setValue(response.id);
      this.formulario.get('NOMEBANCO').setValue(response.nomeBanco);
      this.formulario.get('URL').setValue(response.url);
      this.formulario.get('LOGIN').setValue(response.login);
      this.formulario.get('SENHA').setValue(response.senha);
      this.formulario.get('CREDITO').setValue(response.credito);
      this.formulario.get('DEBITO').setValue(response.debito);
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    }).catch(error => alert('erro'));
  }

  hasErrorFormControl(formControl: AbstractControl): string{
    return hasErrorFormControl(formControl);
  }

  buildEntity(): Banco {
    const banco: Banco = new Banco();
    banco.nomeBanco = this.formulario.get('NOMEBANCO').value;
    banco.url = this.formulario.get('URL').value;
    banco.login = this.formulario.get('LOGIN').value;
    banco.senha = this.formulario.get('SENHA').value;
    banco.credito = this.formulario.get('CREDITO').value;
    banco.debito = this.formulario.get('DEBITO').value;
    banco.saldo = banco.credito - banco.debito;
    banco.status = this.formulario.get('STATUS').value === '0' ? false : true;
    if (this.registroNovo) {
      banco.dataCriacao = SharedVariables.CURRENT_DATE;
    } else {
      banco.dataAtualizacao = SharedVariables.CURRENT_DATE;
    }
    return banco;
  }

  salvar() {
    if (this.registroNovo) {
      this.bancoService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'banco cadastrado com sucesso', 'success', '/banco');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar o novo banco', 'error'));
    } else {
      this.bancoService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'banco atualizado com sucesso', 'success', '/banco');
      }).catch(error => this.sharedNotificationService.enviarNotificacao('', 'Erro ao atualizar os dados do banco', 'error'));
    }
  }
}
