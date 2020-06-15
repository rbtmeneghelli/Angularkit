// Padrão
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Model
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { Auditoria } from '../../app_entities/model/auditoria.model';

// Service
import { take } from 'rxjs/operators';
import { AuditoriaService } from './../../app_business/service/auditoria.service';


@Component({
    selector: 'app-lista-auditoria',
    templateUrl: './lista-auditoria.component.html'
})

export class ListaAuditoriaComponent implements OnInit {

    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    public displayedColumns: string[] = ['dataCriacao', 'tela', 'classe', 'metodo', 'idUsuario', '#'];
    public dataSource: MatTableDataSource<Auditoria>;
    public closeModal: string;
    public auditoria: Auditoria;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private auditoriaService: AuditoriaService) { }

    ngOnInit() {
        this.cardCabecalhoDTO.tituloCard = 'Lista de Auditoria';
        this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
        this.cardCabecalhoDTO.nomeTela = 'Auditoria';
        this.loadAll();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    configDataTable(lista: Array<Auditoria>) {
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
        this.auditoriaService.getAll().pipe(take(1)).toPromise().then(response => {
            this.configDataTable(response);
        }).catch(error => alert('erro'));
    }
}
