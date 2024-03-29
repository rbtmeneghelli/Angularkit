// Padrão
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Model
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';

// Service
import { take } from 'rxjs/operators';
import { SharedService } from 'src/app/app_business/service/shared.service';
import { EmpresaService } from 'src/app/app_business/service/empresa.service';
import Swal from 'sweetalert2';
import { Empresa } from 'src/app/app_entities/model/empresa.model';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';


@Component({
    selector: 'app-lista-empresa',
    templateUrl: './lista-empresa.component.html'
})

export class ListaEmpresaComponent implements OnInit {

    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    public displayedColumns: string[] = ['cnpj', 'nomeEmpresa', 'nomeFantasia', 'dataCriacao', '#'];
    public dataSource: MatTableDataSource<Empresa>;
    public closeModal: string;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private sharedService: SharedService,
        private empresaService: EmpresaService,
        private sharedNotificationService: SharedNotificationService) { }

    ngOnInit() {
        this.cardCabecalhoDTO.tituloCard = 'Lista de Empresas';
        this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
        this.cardCabecalhoDTO.nomeTela = 'Empresa';
        this.loadAll();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    configDataTable(lista: Array<Empresa>) {
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
        this.empresaService.getAll().pipe(take(1)).toPromise().then(response => {
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
                this.empresaService.updateStatus(id).toPromise().then(response => {
                    this.sharedNotificationService.enviarNotificacao('', 'o registro foi excluido com sucesso', 'success');
                    this.loadAll();
                }).catch(error => alert('erro'));
            }
        });
    }
}
