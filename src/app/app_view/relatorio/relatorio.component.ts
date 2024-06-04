import { FiltroArquivo } from './../../app_entities/generic/filtro-arquivo';
import { DownloadService } from './../../app_business/service/download.service';
import { Component, OnInit } from '@angular/core';
import { arrString } from 'src/app/app_business/shared/shared-types';
// import JSZip from 'jszip';

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html'
})

export class RelatorioComponent implements OnInit {

    constructor(private readonly downloadService: DownloadService) {
    }

    ngOnInit() {
        // Gerador de pacote de arquivos num unico Zip
        // Bibliotecas usadas: JsZip e File Saver
    }

    getAttachment(diretorios: arrString) {
        // let zip: JSZip = new JSZip();
        // let countArquivo = 0;
        // // tslint:disable-next-line: deprecation
        // this.downloadService.getFilesToZip(this.setFiltro(diretorios)).pipe(take(1), delay(500)).subscribe(response => {
        //     response.forEach(arrayByte => {
        //         zip = this.downloadFile(arrayByte, zip, countArquivo);
        //         countArquivo++;
        //     });
        //     zip.generateAsync({ type: 'blob' }).then(content => {
        //         saveAs(content, 'Anexo.zip');
        //     });
        // },
        //     error => {
        //         console.log('ERRO PARA GERAR O ZIP!!!');
        //     }
        // );
    }

    // downloadFile(data: any, zip: JSZip, countArquivo: number): JSZip {
    //     const blob = new Blob([this.getByteArray(data)], { type: 'text/plain' });
    //     const nomeArquivo = 'arquivo' + countArquivo + '.txt';
    //     zip.file(nomeArquivo, blob, { binary: true });
    //     return zip;
    // }

    getByteArray(data: any) {
        return atob(data);
    }

    convertBase64ToArrayBuffer(base64) {
        // application/pdf
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    setFiltro(diretorios: arrString): FiltroArquivo {
        const filtroArquivo: FiltroArquivo = new FiltroArquivo();
        filtroArquivo.Diretorios = diretorios;
        return filtroArquivo;
    }
}
