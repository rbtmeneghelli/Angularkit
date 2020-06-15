import { ClienteService } from '../../app_business/service/cliente.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html'
})

export class ContaComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: Array<DropDownList>;
  public bloquearCampo: boolean;
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) {
    this.formulario = this.formBuilder.group({
      ID: [''],
      CPF: ['', Validators.required],
      NOME: ['', Validators.required],
      STATUS: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Conta';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Conta';
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
