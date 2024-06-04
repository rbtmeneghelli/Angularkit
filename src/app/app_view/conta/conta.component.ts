import { ClienteService } from '../../app_business/service/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html'
})

export class ContaComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Conta','Cadastro','Conta');
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: arrDropDownList = statusList;
  public bloquearCampo: boolean;
  constructor(
    private readonly sharedService: SharedService,
    private readonly formBuilder: FormBuilder,
    public readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute
  ) {
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
}
