import { Component, Input, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// tslint:disable-next-line: max-line-length
import { TemplateTabelaMaterialGenericaFilterComponent } from './template-tabela-material-generica-filter/template-tabela-material-generica-filter.component';
import { CardFilterComponent } from '../../shared/card-filter/card-filter.component';
import { arrNumber } from 'src/app/app_business/shared/shared-types';
import { SharedVarTable } from 'src/app/app_business/shared/shared-constants';
@Component({
    selector: 'app-template-tabela-material-generica',
    templateUrl: './template-tabela-material-generica.component.html',
    styleUrls: ['./template-tabela-material-generica.component.scss']
})

export class TemplateTabelaMaterialGenericaComponent implements AfterViewInit {
    @Input() tableData;
    @Input() columnHeader;
    @Input() pageSize;

    public pageSizeOptions?: arrNumber = SharedVarTable.PAGE_SIZE_OPTION;
    public objectKeys = Object.keys;
    public dataSource?: any = new MatTableDataSource();
    public arrHeaders: any[] = [];
    public dataFilters?: Array<any> = new Array<any>();
    public totalRecords?: number;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(CardFilterComponent, { static: false })
    cardFilterComponent: CardFilterComponent;

    constructor(public dialog: MatDialog) { }

    ngAfterViewInit(): void {
        this.configDataTable([]);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!!this.tableData && this.tableData?.length > 0) {
            this.configDataTable(this.tableData);
        }
      }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    configDataTable(lista: Array<any>): void {
        this.dataSource = new MatTableDataSource(lista);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.firstPageLabel = 'Primeira pagina';
        this.dataSource.paginator._intl.lastPageLabel = 'Ultima pagina';
        this.dataSource.paginator._intl.itemsPerPageLabel = 'Itens por pagina';
        this.dataSource.paginator._intl.nextPageLabel = 'Próxima pagina';
        this.dataSource.paginator._intl.previousPageLabel = 'Voltar pagina';
        // tslint:disable-next-line: max-line-length
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
            length = Math.max(length, 0); const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length)
                // tslint:disable-next-line: align
                : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`;
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    openDialog(): void {
        this.createArrHeader();
        const dialogRef = this.dialog.open(TemplateTabelaMaterialGenericaFilterComponent, {
            width: 'auto',
            height: '700px',
            data: {
                columnHeader: this.arrHeaders,
                dataFilters: this.dataFilters
            }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    createArrHeader(): void {
        let count: number;
        if (!!this.arrHeaders && this.arrHeaders.length === 0) {
            count = 0;
            for (this.tableData of this.objectKeys(this.columnHeader)) {
                this.arrHeaders.push({ id: count, campo: this.columnHeader[this.tableData], status: false });
                count++;
            }
        }
    }

    applyPipeline(value?: string): number {
        // 0 == String Value, 1 == Date Pipeline, 2 == Currency Pipeline, etc...
        try {
            if (value !== undefined && value !== null) {
                if (value.length >= 10) {
                    if (value.trim().indexOf('T', 10) !== -1 && value.trim().indexOf(':', 13) !== -1) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else if (typeof(value) === 'object' ) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
        catch (ex) {
        }
    }

    showFilter(): void {
        this.cardFilterComponent.showMenu(true);
    }

    async getFilter(filter): Promise<void> {
        // Exemplo de codigo para atualizar a lista

        // let lista: Array<any> = new Array<any>();
        // // tslint:disable-next-line: max-line-length
        // await this.formularioService.getAllFilter(this.generalService.getMapEnumForm(this.formulario), { filters: filter }).pipe(take(1)).toPromise().then(response => {
        //   lista = response?.data as Array<any>;
        //   this.dataFilters = filter;
        //   this.configDataTable(lista);
        // }).catch((error: HttpErrorResponse) => {
        //   if (error.status === 401) {
        //     this.notificationService.sendNotification('', TypeMessage.TokenExpired, ActionMessage.Warning);
        //   } else {
        //     this.notificationService.sendNotification('', TypeMessage.Personalized, ActionMessage.Error);
        //   }
        // });
      }
}
