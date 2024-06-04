import { ClienteFilterData } from './../../app_entities/filter/cliente-filter-data';
import { Input } from '@angular/core';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { saveAs } from 'file-saver';
// import { Document, Paragraph, Packer, TextRun } from 'docx';
import { Injectable } from '@angular/core';
import { Column } from '../../app_entities/generic/column';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { SharedVariables } from '../shared/shared-variables';

@Injectable({
  providedIn: 'root'
})

export class ExportadorService {

  public date: Date = SharedVariables.CURRENT_DATE;
  public listColumns: Array<Column> = new Array<Column>();

  constructor(private readonly http: HttpClient) {
    registerLocaleData(localePtBr);
  }

  exportXls(registros: Array<any>) {
    // const workBook = XLSX.utils.book_new();
    // const workSheet = XLSX.utils.json_to_sheet(registros);
    // XLSX.utils.book_append_sheet(workBook, workSheet, 'Registros');
    // XLSX.writeFile(workBook, 'titulo' + '_' + this.date.toLocaleDateString() + '.xlsx');
  }

  exportCsv(registros: Array<any>) {
    // const workBook = XLSX.utils.book_new();
    // const workSheet = XLSX.utils.json_to_sheet(registros);
    // XLSX.utils.book_append_sheet(workBook, workSheet, 'Registros');
    // XLSX.utils.sheet_to_csv(workSheet);
    // XLSX.writeFile(workBook, 'titulo' + '_' + this.date.toLocaleDateString() + '.csv');
  }

  exportDoc(registros: Array<any>) {
    // const doc = new Document();

    // doc.addSection({
    //   properties: {},
    //   children: [
    //     new Paragraph({
    //       children: [
    //         new TextRun('Hello World'),
    //         new TextRun({
    //           text: 'Foo Bar',
    //           bold: true,
    //         }),
    //         new TextRun({
    //           text: 'Github is the best',
    //           bold: true,
    //         }).tab(),
    //       ],
    //     }),
    //   ],
    // });

    // Packer.toBlob(doc).then(blob => {
    //   saveAs(blob, 'titulo' + '_' + this.date.toLocaleDateString() + '.docx');
    // });
  }

  exportPdf = (registros: Array<any>) => {
    // const doc = new jsPDF('p', 'pt', 'a4', true);
    // const rows = [];
    // const columns = [];
    // const xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth('Titulo') * doc.internal.getFontSize() / 2);
    // let blColunas: boolean = true;

    // doc.setTextColor('#47825e');
    // doc.text('Titulo', xOffset, 30);

    // this.montarColunas(registros);

    // for (const item of registros) {
    //   const row: {} = {};
    //   let count = 0;
    //   this.listColumns.map(x => x.ColumnDef).forEach(coluna => {
    //     if (coluna.includes('Data') || coluna.includes('data')) {
    //       const date = new Date(item[coluna]).toLocaleString();
    //       row[count] = date;
    //     } else {
    //       row[count] = item[coluna];
    //     }
    //     if (blColunas) {
    //       columns.push(coluna);
    //     }
    //     count++;
    //   });
    //   blColunas = false;
    //   rows.push(row);
    // }

    // doc.autoTable(columns, rows, {
    //   headStyles: {
    //     fillColor: '#47825e',
    //     fontSize: 11
    //   },
    // });
    // doc.save('titulo' + '_' + this.date.toLocaleDateString() + '.pdf');
  }

  montarColunas(rows: Array<any>): Array<Column> {
    let names = Object.create(null), listColumns;

    rows.forEach(function (o) {
      Object.keys(o).forEach(function (k) {
        names[k] = true;
      });
    });

    listColumns = Object.keys(names);

    for (const itemColumn of listColumns) {
      this.listColumns.push({ ColumnDef: itemColumn, Header: itemColumn });
    }

    return this.listColumns;
  }

  export2Excel(objFilter: ClienteFilterData, url?: string) {
    const fullUri = `${environment.API}/${url}/` + 'Export2Excel';
    const preparedObject = JSON.stringify(objFilter);
    return this.http
      .post(fullUri, preparedObject, {
        observe: 'response',
        responseType: 'blob',
        headers: this.getOptions()
      })
      .pipe(
        map(response => {
          return {
            data: response.body,
            filename: `Modelo_${url}.xlsx`
          };
        })
      );
  }

  getOptions(): HttpHeaders {
    let httpOptions: HttpHeaders = new HttpHeaders();
    httpOptions = httpOptions.set('Content-Type', 'application/json');
    httpOptions = httpOptions.set('Access-Control-Allow-Origin', '*');
    httpOptions = httpOptions.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // tslint:disable-next-line: max-line-length
    httpOptions = httpOptions.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    return httpOptions;
  }
}
