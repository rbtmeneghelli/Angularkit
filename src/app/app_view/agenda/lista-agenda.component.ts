// Padrão
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

// Model
import { Agenda } from '../../app_entities/model/agenda.model';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';

// Service
import { AgendaService } from './../../app_business/service/agenda.service';
import Swal from 'sweetalert2';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { arrString } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';

@Component({
  selector: 'app-lista-agenda',
  templateUrl: './lista-agenda.component.html'
})

export class ListaAgendaComponent implements OnInit {

  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Lista de Agenda', 'Cadastro', 'Agenda');
  public displayedColumns: arrString = ['data', 'local', 'hora', '#'];
  public dataSource: MatTableDataSource<Agenda>;
  public agenda: Agenda;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly agendaService: AgendaService,
    private readonly sharedNotificationService: SharedNotificationService) { }

  ngOnInit() {
    this.loadAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configDataTable(lista: Array<Agenda>) {
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

  loadAll() {
    this.agendaService.getAll().pipe(take(1)).toPromise().then(response => {
      this.configDataTable(response);
    }).catch(error => alert('erro'));
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Confirmar exclusão',
      text: `Deseja confirmar a exclusão do registro ${id}?`,
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.agendaService.deleteById(id).toPromise().then(response => {
          this.sharedNotificationService.enviarNotificacao('', 'o registro foi excluido com sucesso', 'success');
          this.loadAll();
        }).catch(error => alert('erro'));
      }
    });
  }
}
