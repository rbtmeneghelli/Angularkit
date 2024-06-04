import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Arquivo } from '../../app_entities/model/arquivo.model';
import { SharedService } from '../../app_business/service/shared.service';
import { arrString } from 'src/app/app_entities/shared/shared-types';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
// import { saveAs } from 'file-saver';

@Component({
  selector: 'app-template-upload',
  templateUrl: './template-upload.component.html',
  styleUrls: ['./template-upload.component.css']
})

export class TemplateUploadComponent implements OnInit {

  displayedColumns: arrString = ['nome', 'tamanho', 'Download', 'Excluir'];
  dataSource = new MatTableDataSource();
  listaArquivo: Array<Arquivo> = new Array<Arquivo>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private readonly sharedService: SharedService) { }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.listaArquivo.push({ id: 1, nomeArquivo: 'Arquivo', tamanhoArquivo: '10kb', dataCriacao: SharedVariables.CURRENT_DATE, dataAtualizacao: SharedVariables.CURRENT_DATE, acoes: '#' });
    this.dataSource = new MatTableDataSource(this.listaArquivo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  download(tipoArquivo: string) {
    let url = '';
    let filename = '';
    let tipoMime = '';
    const listaTipoImagem = ['PNG', 'JPEG', 'JPG'];

    if (tipoArquivo === 'Pdf') {
      url = '';
      filename = '';
      tipoMime = 'application/pdf';
    } else if (listaTipoImagem.find(x => x === tipoArquivo.toUpperCase()).length > 0) {
      url = '';
      filename = '';
      tipoMime = 'image/png';
    }
    this.sharedService.download(url).subscribe(res => {
      const blob = new Blob([res], { type: tipoMime });
      // detect whether the browser is IE/Edge or another browser
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   // To IE or Edge browser, using msSaveorOpenBlob method to download file.
      //   window.navigator.msSaveOrOpenBlob(blob, filename + this.sharedService.getArquivoExtensao(url));
      // } else {
      //   // saveAs(blob, filename);
      // }
    });
  }

  processFile(event: any, icone: string) {
  }
}
