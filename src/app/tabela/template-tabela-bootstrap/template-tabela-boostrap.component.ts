import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstadosFilterData } from '../../app_entities/model/estados-filter-data';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { EstadosService } from 'src/app/app_business/service/estados.service';
import { Estados } from 'src/app/app_entities/model/estados.model';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { arrNumber } from 'src/app/app_entities/shared/shared-types';

@Component({
  selector: 'app-template-tabela-boostrap',
  templateUrl: './template-tabela-boostrap.component.html',
  styleUrls: ['./template-tabela-boostrap.component.css']
})

// tslint:disable-next-line: directive-class-suffix
export class TemplateTabelaBootstrapComponent implements OnInit {
  public lista: EstadosFilterData = new EstadosFilterData();
  public page = 1;
  public pageSize = 5;
  public totalPages = [1];
  public total = 1;
  public nextPage = null;
  public disableBtnLastPage?: boolean;
  public disableBtnNextPage?: boolean;
  public orderbyAsc?: boolean;
  public formulario: FormGroup;
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('States','Table with Boostrap','Pipeline');

  constructor(
    private readonly estadosService: EstadosService, 
    private readonly formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      QTYFORPAGE: [5, []]
    });
  }

  ngOnInit() {
    this.setDefaultValues();
    this.load();
  }

  setDefaultValues() {
    this.lista.pageIndex = this.page;
    this.lista.pageSize = this.pageSize;
    this.disableBtnLastPage = true;
    this.disableBtnNextPage = false;
    this.orderbyAsc = true;
  }

  changePage(page?: number, type?: string) {
    if (!!type) {
      this.lista.pageIndex = type === 'Anterior' && this.lista.pageIndex > 1 ? this.lista.pageIndex - 1 :
        // tslint:disable-next-line: max-line-length
        type === 'Proximo' && this.lista.pageIndex < this.totalPages[this.totalPages.length - 1] ? this.lista.pageIndex + 1 : this.lista.pageIndex;
    } else {
      this.lista.pageIndex = page;
    }
    this.disableBtnLastPage = this.lista.pageIndex === 1 ? true : false;
    this.disableBtnNextPage = this.lista.pageIndex === this.totalPages[this.totalPages.length - 1] ? true : false;
    this.lista.data = null;
    this.loadPage(this.lista.pageIndex);
  }

  load() {
    this.estadosService.getAll().subscribe(estados => {
      if (!!estados) {
        this.lista.data = estados.slice((this.lista.pageIndex - 1) * this.lista.pageSize, this.lista.pageIndex * this.lista.pageSize);
        this.total = 50;
        this.totalPages = this.calculateTotalPages(this.lista.pageSize, this.total);
      }
    });
  }

  loadPage(page) {
    this.estadosService.getAll().subscribe(estados => {
      if (!!estados) {
        this.page = page;
        this.lista.pageIndex = page;
        this.lista.pageSize = this.formulario.controls.QTYFORPAGE.value;
        this.pageSize = this.formulario.controls.QTYFORPAGE.value;
        this.orderbyAsc = true;
        this.total = 50;
        this.lista.data = null;
        this.lista.data = estados.slice((this.lista.pageIndex - 1) * this.lista.pageSize, this.lista.pageIndex * this.lista.pageSize);
        this.totalPages = this.calculateTotalPages(this.lista.pageSize, this.total);
      }
    });
  }

  calculateTotalPages(pageSize?: number, total?: number): arrNumber {
    const totalPages: arrNumber = [];
    let pageIndex: number = this.lista.pageIndex;
    if (!!total) {
      const qtyPage = total >= this.lista.pageSize ? total / pageSize : 1;
      if (pageIndex >= qtyPage) {
        pageIndex = qtyPage;
        totalPages.push(pageIndex - 2);
        totalPages.push(pageIndex - 1);
        totalPages.push(pageIndex);
      }
      for (let i = 0; i <= qtyPage; i++) {
        if (i === 0 && pageIndex < qtyPage) {
          totalPages.push(pageIndex++);
        } else if (i > 0 && i < 3 && pageIndex <= qtyPage) {
          totalPages.push(pageIndex++);
        } else {
          break;
        }
      }
    } else {
      totalPages.push(1);
    }
    return totalPages;
  }

  onChangePageSize(event?: any) {
    this.lista.pageSize = event;
    this.pageSize = event;
    this.formulario.controls.QTYFORPAGE.setValue(event);
    this.loadPage(this.lista.pageIndex);
  }

  sortColumn(numOrder?: number) {
    this.orderbyAsc = this.orderbyAsc ? false : true;
    switch (numOrder) {
      case 1:
        this.lista.data = this.orderbyId(this.lista.data);
        break;
      case 2:
        this.lista.data = this.orderbySigla(this.lista.data);
        break;
      case 3:
        this.lista.data = this.orderbyEstado(this.lista.data);
        break;
    }
  }

  orderbyId(lista?: Estados[]): Estados[] {
    if (this.orderbyAsc) {
      return this.lista.data.sort((a, b) => (a.id > b.id ? 1 : -1));
    } else {
      return this.lista.data.sort((a, b) => (a.id > b.id ? -1 : 1));
    }
  }

  orderbySigla(lista?: Estados[]): Estados[] {
    if (this.orderbyAsc) {
      return this.lista.data.sort((a, b) => (a.sigla > b.sigla ? 1 : -1));
    } else {
      return this.lista.data.sort((a, b) => (a.sigla > b.sigla ? -1 : 1));
    }
  }

  orderbyEstado(lista?: Estados[]): Estados[] {
    if (this.orderbyAsc) {
      return this.lista.data.sort((a, b) => (a.nome > b.nome ? 1 : -1));
    } else {
      return this.lista.data.sort((a, b) => (a.nome > b.nome ? -1 : 1));
    }
  }
}
