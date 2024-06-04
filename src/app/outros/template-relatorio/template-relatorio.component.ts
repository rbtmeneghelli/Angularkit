import { CardPdfViewerComponent } from './../../shared/card-pdf-viewer/card-pdf-viewer.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { ExportadorService } from '../../app_business/service/exportador.service';
import { SharedService } from '../../app_business/service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { arrString } from 'src/app/app_entities/shared/shared-types';


export interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-template-relatorio',
  templateUrl: './template-relatorio.component.html',
  styleUrls: ['./template-relatorio.component.css']
})

export class TemplateRelatorioComponent implements OnInit {

  displayedColumns: arrString = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private readonly exportadorService: ExportadorService, 
    private readonly sharedNotificationService: SharedNotificationService, 
    private dialog: MatDialog,
    private readonly sharedService: SharedService) {
    registerLocaleData(localePtBr);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  exportar(tipoArquivo: string) {
    // this.exportarPdf(ELEMENT_DATA);
    this.sharedNotificationService.enviarNotificacao('teste', 'ola', 'success');
  }
  //   exportarPdf(){
  //     const doc = new jsPDF('p', 'pt', 'a4', true);
  //     let rows = [];
  //     let xOffset = (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth("") * doc.internal.getFontSize() / 2);
  // debugger;
  //     doc.setTextColor('#47825e');
  //     doc.text("", xOffset, 30);
  //     let colunas = [
  //       { position: 'position', dataKey: 'position' },
  //       { name: 'name', dataKey: 'name' },
  //       { weight: 'weight', dataKey: 'weight' },
  //       { symbol: 'symbol', dataKey: 'symbol' },
  //     ];
  //     for (let item of ELEMENT_DATA) {
  //       let row: {} = {};
  //       colunas.forEach(coluna => {
  //         if (coluna.dataKey.includes('Data') || coluna.dataKey.includes('data')) {
  //           let date = new Date(item[coluna.dataKey]).toLocaleString();
  //           row[coluna.dataKey] = date;
  //         }
  //         else
  //           row[coluna.dataKey] = item[coluna.dataKey]
  //       });
  //       rows.push(row);
  //     }
  //     doc.autoTable(ELEMENT_DATA, rows, {
  //       headStyles: {
  //         fillColor: '#47825e',
  //         fontSize: 11
  //       },
  //     });
  //     doc.save("dsadsdas" + '_'  + '.pdf');
  //   }

  visualizar() {
    const dialogConfig = this.sharedService.getDialogConfig();
    const dialogRef = this.dialog.open(CardPdfViewerComponent, dialogConfig);
  }
}

