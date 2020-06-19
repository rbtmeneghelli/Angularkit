import { SharedService } from './../../app_business/service/shared.service';
import { Cliente } from './../../app_entities/model/cliente.model';
import { ClienteService } from './../../app_business/service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteFilterData } from '../../app_entities/filter/cliente-filter-data';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFilterComponent } from './cliente-filter.component';

@Component({
  selector: 'app-lista-cliente-back',
  templateUrl: './lista-cliente-back.component.html',
  styleUrls: ['./lista-cliente-back.component.scss']
})
export class ListaClienteBackComponent implements OnInit {
  public dataSource = new MatTableDataSource();
  public loading = true;
  public page = 1;
  public totalPages = [1];
  public total = 1;
  public nextPage = null;
  public clienteFilterData: ClienteFilterData = new ClienteFilterData();
  columns = [
    // tslint:disable-next-line: max-line-length
    { columnType: 'text', columnDef: 'cpf', header: 'Cpf', cell: (element: any) => `${element.externalCode || '-'}` },
    // tslint:disable-next-line: max-line-length
    { columnType: 'text', columnDef: 'nome', header: 'Nome', cell: (element: any) => `${element.tradingName}` },
    // tslint:disable-next-line: max-line-length
    { columnType: 'text', columnDef: 'status', header: 'Status', cell: (element: any) => `${element.companyName}` },
    // tslint:disable-next-line: max-line-length
    { columnType: 'icon', columnDef: 'edit', header: '', class: '', cell: (element: any) => 'edit', funcCall: (element: any) => this.editItem(element), toolTip: 'Editar' },
    // tslint:disable-next-line: max-line-length
    { columnType: 'icon', columnDef: 'delete', header: '', class: '', cell: (element: any) => 'delete', funcCall: (element: any) => this.deleteItem(element), toolTip: 'Excluir' },
  ];

  displayedColumns = this.columns.map(a => a.columnDef);

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private utilService: SharedService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.loadCliente();
  }

  setFiltroPadrao() {
    this.clienteFilterData.pageIndex = 1;
    this.clienteFilterData.pageSize = 10;
    this.clienteFilterData.cpf = null;
    this.clienteFilterData.nome = null;
  }

  loadCliente(page?: any) {
    this.clienteService.getAllFilter().toPromise().then(data => {
      if (!!data) {
        this.dataSource.data = data;
        this.page = data.page;
        this.total = data.total;
        this.nextPage = data.nextPage;
      }
      this.loading = false;
    }).catch(error => {
      this.loading = false;
    });
  }

  changePage(page) {
    this.clienteFilterData.pageIndex = page;
    this.dataSource.data = null;
    this.loadCliente();
  }

  editItem(row: any) {
    this.router.navigate([`provider/${row.id}/edit`]);
  }

  deleteItem(row: Cliente) {
    // this.utilService.show({ text: `O cliente ${row.nomeCliente} será excluído. Confirmar?` }, (confirm: boolean) => {
    //   if (confirm) {
    //     return this.clienteService.deleteById(row.id).toPromise().then(data => {
    //       const index = this.dataSource.data.findIndex(a => a === row);
    //       if (index >= 0) {
    //         this.dataSource.data.splice(index, 1);
    //         this.dataSource._updateChangeSubscription();
    //       }
    //     }).catch(data => {
    //       this.modalService.show({ text: data.message });
    //     });
    //   }
    // });
  }

  filtrar() {
    const dialogConfig = this.utilService.getDialogConfig();
    const dialogRef = this.dialog.open(ClienteFilterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if (!!response.filtro) {
        this.clienteFilterData.cpf = response.filtro.companyName;
        this.clienteFilterData.nome = response.filtro.tradingName;
        this.loadCliente();
      }
    });
  }
}
