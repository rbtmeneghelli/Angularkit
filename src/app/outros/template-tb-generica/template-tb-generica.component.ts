import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Column } from '../../app_entities/generic/column.model';
import { Service } from '../../app_entities/generic/service.model';
import { ExportadorService } from 'src/app/app_business/service/exportador.service';
import { arrString } from 'src/app/app_business/shared/shared-types';

@Component({
  selector: 'app-template-tb-generica',
  templateUrl: './template-tb-generica.component.html',
  styleUrls: ['./template-tb-generica.component.css']
})
export class TemplateTbGenericaComponent implements OnInit {

  dataSource = new MatTableDataSource();
  listColumns: Array<Column> = new Array<Column>();

  @Input() service: Service;
  modeloBotao: string;

  rows: Array<any> = [{ id: '1', name: 'Macaw, scarlet', lat: '31.215291', lng: '118.931012', Acoes: '#' }];

  rows2: Array<any> = [
    { id: '1', name: 'Macaw, scarlet', lat: '31.215291', Acoes: '#' },
    { id: '2', name: 'Armadillo, nine-banded', lat: '35.663752', Acoes: '#' },
    { id: '3', name: 'Greater roadrunner', lat: '13.17535', Acoes: '#' },
    { id: '4', name: 'Goanna lizard', lat: '22.671042', Acoes: '#' },
    { id: '5', name: 'Cape starling', lat: '16.0213558', Acoes: '#' }
  ];

  displayedColumns: arrString = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private readonly exportadorService: ExportadorService) { }

  ngOnInit(): void {

    this.modeloBotao = this.service.Modelo;
    if (!this.modeloBotao) {
      this.deletarColunaAcoes(this.service.Lista);
    }
    this.displayedColumns = this.montarColunas(this.service.Lista[0]).map(c => c.ColumnDef);
    this.dataSource = new MatTableDataSource(this.service.Lista);
    this.ConfigurarDataTable();
  }

  montarColunas(rows: any): Array<Column> {
    // tslint:disable-next-line: one-variable-per-declaration
    let names = Object.create(null), listColumns;

    // tslint:disable-next-line: only-arrow-functions
    this.service.Lista.forEach(function(o) {
      // tslint:disable-next-line: only-arrow-functions
      Object.keys(o).forEach(function(k) {
        names[k] = true;
      });
    });

    listColumns = Object.keys(names);

    for (const itemColumn of listColumns) {
      this.listColumns.push({ ColumnDef: itemColumn, Header: itemColumn });
    }

    return this.listColumns;
  }

  ConfigurarDataTable() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletarColunaAcoes(rows: any[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < rows.length; i++) {
      delete rows[i].Acoes;
    }
  }

  callService(element: any, tipo: string) {
    switch (tipo) {
      case 'Alterar':
        alert('Rota Editar: ' + this.service.UrlEdit + ' ID: ' + element.Id);
        break;
      case 'Deletar':
        alert('Rota Deletar: ' + this.service.UrlDelete + ' ID: ' + element.Id);
        break;
      case 'Visualizar':
        alert('Rota Visualizar: ' + this.service.UrlView + ' ID: ' + element.Id);
        break;
      case 'Download':
        alert('Rota Download: ' + this.service.UrlFile + ' ID: ' + element.Id);
        break;
      case 'DeletarArquivo':
        alert('Rota Deletar Arquivo: ' + this.service.UrlDeleteFile + ' ID: ' + element.Id);
        break;
      case 'Pdf':
        const listaExportacaoPdf = this.service.Lista;
        this.deletarColunaAcoes(listaExportacaoPdf);
        this.exportadorService.exportPdf(listaExportacaoPdf);
        break;
      case 'Excel':
        const listaExportacaoExcel = this.service.Lista;
        this.deletarColunaAcoes(listaExportacaoExcel);
        this.exportadorService.exportXls(listaExportacaoExcel);
        break;
      case 'Csv':
        const listaExportacaoCsv = this.service.Lista;
        this.deletarColunaAcoes(listaExportacaoCsv);
        this.exportadorService.exportCsv(listaExportacaoCsv);
        break;
      case 'Word':
        const listaExportacaoWord = this.service.Lista;
        this.deletarColunaAcoes(listaExportacaoWord);
        this.exportadorService.exportDoc(listaExportacaoWord);
        break;
    }
  }
}
