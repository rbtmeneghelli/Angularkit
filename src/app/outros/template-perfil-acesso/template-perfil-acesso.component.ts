import { Component, OnInit } from '@angular/core';
import { Permissao } from '../../app_entities/model/permissao.model';

@Component({
  selector: 'app-template-perfil-acesso',
  templateUrl: './template-perfil-acesso.component.html',
  styleUrls: ['./template-perfil-acesso.component.css']
})
export class TemplatePerfilAcessoComponent implements OnInit {

  lista: Array<Permissao> = new Array<Permissao>();
  checked: boolean;

  constructor() { }

  ngOnInit() {
    this.checked = false;
    this.lista.push({ id: 1, nome: 'Login', status: true, dataCriacao: new Date(), dataAtualizacao: new Date(), acoes: '#' });
    this.lista.push({ id: 2, nome: 'Crud', status: true, dataCriacao: new Date(), dataAtualizacao: new Date(), acoes: '#' });
    this.lista.push({ id: 3, nome: 'Tabela', status: false, dataCriacao: new Date(), dataAtualizacao: new Date(), acoes: '#' });
    this.lista.push({ id: 4, nome: 'Outros', status: true, dataCriacao: new Date(), dataAtualizacao: new Date(), acoes: '#' });
  }

  selectAll(checked): void {
    this.checked = checked === false ? true : false;
    if (this.checked) {
      for (const permissao of this.lista) {
        permissao.status = true;
      }
    } else {
      for (const permissao of this.lista) {
        permissao.status = false;
      }
    }
  }
}
