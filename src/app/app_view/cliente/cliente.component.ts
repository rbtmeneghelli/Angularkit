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

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})

export class ClienteComponent extends BaseFormComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly sharedNotificationService: SharedNotificationService,
    private formBuilder: FormBuilder,
    public readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sharedService: SharedService,
    private readonly route: ActivatedRoute) {
    super('Formulario Cliente','Cadastro','Cliente');
    this.formulario = this.formBuilder.group({
      ID: [''],
      CPF: ['', [Validators.required, this.validarCpf]],
      NOME: ['', Validators.required],
      STATUS: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.route.data.subscribe(async (data: any) => {
      if (!!data) {
        //Faz alguma ação
      }
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

  salvar() {
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

  validarCpf(controle: AbstractControl) {
    let soma: number;
    let resto: number;
    let cpf = controle.value;

    if (cpf === undefined) {
      return { cpfInvalido: true };
    } else if (cpf === '' || cpf === null) {
      return { cpfInvalido: true };
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
      return { cpfInvalido: true };
    }

    soma = 0;
    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) {
      return { cpfInvalido: true };
    } else {
      for (let i = 1; i <= 9; i++) {
        // tslint:disable-next-line: radix
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      // tslint:disable-next-line: radix
      if (resto !== parseInt(cpf.substring(9, 10))) {
        return { cpfInvalido: true };
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        // tslint:disable-next-line: radix
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      // tslint:disable-next-line: radix
      if (resto !== parseInt(cpf.substring(10, 11))) {
        return { cpfInvalido: true };
      }
      return null;
    }
  }
}
