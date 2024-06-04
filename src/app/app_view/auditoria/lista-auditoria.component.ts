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
import { arrString } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';

@Component({
    selector: 'app-lista-auditoria',
    templateUrl: './lista-auditoria.component.html'
})

export class ListaAuditoriaComponent implements OnInit {

    public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Lista de Auditoria','Cadastro','Auditoria');
    public displayedColumns: arrString = ['dataCriacao', 'tela', 'classe', 'metodo', 'idUsuario', '#'];
    public dataSource: MatTableDataSource<Auditoria>;
    public closeModal: string;
    public auditoria: Auditoria;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private readonly auditoriaService: AuditoriaService) { }

    ngOnInit() {
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
        this.auditoriaService.getAll().pipe(take(1)).toPromise().then(response => {
            this.configDataTable(response);
        }).catch(error => alert('erro'));
    }
}
