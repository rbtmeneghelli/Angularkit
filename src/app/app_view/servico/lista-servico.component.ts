import { EnumTipoServico } from './../../app_entities/enum/EnumTipoServico';
// Padrão
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

// Model
import { Servico } from '../../app_entities/model/servico.model';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';

// Service
import { ServicoService } from './../../app_business/service/servico.service';
import { SharedService } from '../../app_business/service/shared.service';
import Swal from 'sweetalert2';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { arrString } from 'src/app/app_business/shared/shared-types';

@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.component.html'
})

export class ListaServicoComponent implements OnInit {

  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public displayedColumns: arrString = ['descricao', 'tipoServico', 'dataCriacao', '#'];
  public dataSource: MatTableDataSource<Servico>;
  public servico: Servico;
  public enumTipoServico: EnumTipoServico;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private servicoService: ServicoService,
    private sharedService: SharedService,
    private sharedNotificationService: SharedNotificationService) { }

  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Lista de Serviço';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Serviço';
    this.loadAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configDataTable(lista: Array<Servico>) {
    this.dataSource = new MatTableDataSource(lista);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.firstPageLabel = 'Primeira pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Ultima pagina';
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Itens por pagina';
    this.dataSource.paginator._intl.nextPageLabel = 'Próxima pagina';
    this.dataSource.paginator._intl.previousPageLabel = 'Voltar pagina';
    // tslint:disable-next-line: max-line-length
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length === 0 || pageSize === 0) { return `0 de ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`; };
    this.dataSource.sort = this.sort;
  }

  loadAll() {
    this.servicoService.getAll().pipe(take(1)).toPromise().then(response => {
      this.configDataTable(response);
    }).catch(error => alert('erro'));
  }

  getEnumDescricao(iTipoServico: number) {
    return EnumTipoServico[iTipoServico];
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
        this.servicoService.deleteById(id).toPromise().then(response => {
          this.sharedNotificationService.enviarNotificacao('', 'o registro foi excluido com sucesso', 'success');
          this.loadAll();
        }).catch(error => alert('erro'));
      }
    });
  }
}
