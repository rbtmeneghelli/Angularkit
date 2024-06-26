import { ClienteService } from '../../app_business/service/cliente.service';
// Padrão
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Model
import { Cliente } from '../../app_entities/model/cliente.model';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';

// Service
import { take } from 'rxjs/operators';
import { arrString } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';


@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.component.html'
})

export class ListaClienteComponent implements OnInit {

  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Lista de Clientes','Cadastro','Cliente');
  public displayedColumns: arrString = ['Cpf', 'Nome', 'Status', '#'];
  public dataSource: MatTableDataSource<Cliente>;
  public closeModal: string;
  public cliente: Cliente;
  public clienteModal: Cliente;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly modalService: NgbModal,
    private readonly clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.loadAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configDataTable(lista: Array<Cliente>) {
    this.dataSource = new MatTableDataSource(lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.firstPageLabel = SharedVariables.FIRST_PAGE_LABEL;
    this.dataSource.paginator._intl.lastPageLabel = SharedVariables.LAST_PAGE_LABEL;
    this.dataSource.paginator._intl.itemsPerPageLabel = SharedVariables.ITEMS_PAGE_LABEL;
    this.dataSource.paginator._intl.nextPageLabel = SharedVariables.NEXT_PAGE_LABEL;
    this.dataSource.paginator._intl.previousPageLabel = SharedVariables.PREVIOUS_PAGE_LABEL;
    // tslint:disable-next-line: max-line-length
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length === 0 || pageSize === 0) { return `0 de ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`; };
    this.dataSource.sort = this.sort;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content, row) {
    this.clienteModal = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', size: 'lg' }).result.then(
      result => {
        this.closeModal = `Closed with: ${result}`;
      },
      reason => {
        this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  loadAll() {
    this.clienteService.getAll().pipe(take(1)).subscribe(response => {
      this.configDataTable(response);
    });
  }

  getStatusModalAssinatura(statusModal: boolean) {
    if (statusModal) {
      this.loadAll();
    }
  }
}
