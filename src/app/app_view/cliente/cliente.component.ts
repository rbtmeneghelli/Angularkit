import { ClienteService } from '../../app_business/service/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { Cliente } from '../../app_entities/model/cliente.model';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FORMULARIO_CLIENTE } from 'src/app/app_entities/forms/cliente.form';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly sharedNotificationService: SharedNotificationService,
    public readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedService: SharedService,
    private readonly route: ActivatedRoute) {
    super();
    this.formulario = FORMULARIO_CLIENTE;
  }

  ngAfterViewInit(): void {
    this.route.data.subscribe(async (data: any) => {
      if (!!data) {
        //Faz alguma ação
      }
    });
  }

  ngOnInit() {
    this.getHeaderPage('Formulario Cliente','Cadastro','Cliente');
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
    this.clienteService.getById(id).pipe(take(1)).subscribe(response => {
      this.formulario.get('ID').setValue(id);
      this.formulario.get('CPF').setValue(response.cpf);
      this.formulario.get('NOME').setValue(response.nomeCliente);
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    });
  }

  hasErrorFormControl(formControl: AbstractControl): string{
    return hasErrorFormControl(formControl);
  }

  buildEntity(): Cliente {
    const cliente: Cliente = new Cliente();
    cliente.cpf = this.formulario.get('CPF').value;
    cliente.nomeCliente = this.formulario.get('NOME').value;
    cliente.status = this.formulario.get('STATUS').value === '0' ? false : true;
    cliente.dataCriacao = SharedVariables.CURRENT_DATE;
    return cliente;
  }

  saveForm() {
    if (this.registroNovo) {
      this.clienteService.create(this.buildEntity()).pipe(take(1)).subscribe(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'cliente cadastrado com sucesso', 'success', '/cliente');
      }, error => {
        this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar o novo cliente', 'error');
      });
    } else {
      this.clienteService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).subscribe(response => {
        this.sharedNotificationService.enviarNotificacaoToRoute('', 'cliente atualizado com sucesso', 'success', '/cliente');
      }, error => {
        this.sharedNotificationService.enviarNotificacao('', 'Erro ao atualizar os dados do cliente', 'error');
      });
    }
  }
}
