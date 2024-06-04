import { ClienteService } from '../../app_business/service/cliente.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html'
})

export class ContaComponent extends BaseFormComponent implements OnInit {
  constructor(
    private readonly sharedService: SharedService,
    private readonly formBuilder: FormBuilder,
    public readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super('Formulario Conta','Cadastro','Conta');
    this.formulario = this.formBuilder.group({
      ID: [''],
      CPF: ['', Validators.required],
      NOME: ['', Validators.required],
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
    this.clienteService.getById(id).pipe(take(1)).subscribe(response => {
      this.formulario.get('ID').setValue(id);
      this.formulario.get('CPF').setValue(response.cpf);
      this.formulario.get('NOME').setValue(response.nomeCliente);
      this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
      this.registroNovo = false;
      this.bloquearCampo = true;
    });
  }

  salvar() {
    throw new Error('Method not implemented.');
  }

  hasErrorFormControl(formControl: AbstractControl): string {
    throw new Error('Method not implemented.');
  }
}
