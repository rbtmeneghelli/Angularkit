import { Funcionalidade } from './../../app_entities/model/funcionalidade.model';
import { FuncionalidadeService } from './../../app_business/service/funcionalidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { DropDownList } from '../../app_entities/generic/dropdownlist';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';

@Component({
  selector: 'app-funcionalidade',
  templateUrl: './funcionalidade.component.html'
})

export class FuncionalidadeComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public registroNovo: boolean;
  public formulario: FormGroup;
  public listaStatus: Array<DropDownList>;
  public bloquearCampo: boolean;
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    public funcionalidadeService: FuncionalidadeService,
    private activatedRoute: ActivatedRoute,
    private sharedNotificationService: SharedNotificationService) {
    this.formulario = this.formBuilder.group({
      ID: [''],
      DESCRICAO: ['', Validators.required],
      ROLE: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Funcionalidade';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Funcionalidade';
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
      funcionalidade.dataCriacao = new Date();
    } else {
      funcionalidade.dataAtualizacao = new Date();
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

  getDescricao() {
    return this.formulario.get('DESCRICAO').hasError('required') ? 'O campo nome da funcionalidade é obrigatório' : '';
  }

  getRole() {
    return this.formulario.get('ROLE').hasError('required') ? 'O campo nome da role é obrigatório' : '';
  }
}
