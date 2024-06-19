import { ClienteService } from '../../app_business/service/cliente.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FORMULARIO_CONTA } from 'src/app/app_entities/forms/conta.form';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html'
})

export class ContaComponent extends BaseFormComponent implements OnInit {
  constructor(
    private readonly sharedService: SharedService,
    public readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
    this.formulario = FORMULARIO_CONTA;
  }

  ngOnInit() {
    this.getHeaderPage('Formulario Conta','Cadastro','Conta');
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

  saveForm() {
    throw new Error('Method not implemented.');
  }

  hasErrorFormControl(formControl: AbstractControl): string {
    throw new Error('Method not implemented.');
  }
}
