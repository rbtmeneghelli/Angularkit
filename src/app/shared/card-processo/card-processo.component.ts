import { ArquivoDTO } from './../../app_entities/dto/arquivo.dto';
import { SharedService } from './../../app_business/service/shared.service';
import { OnInit, Input, Component } from '@angular/core';
// import { saveAs } from 'file-saver';
import { DocumentosProcessoDTO } from '../../app_entities/dto/processo.dto';

@Component({
  selector: 'app-card-processo',
  templateUrl: './card-processo.component.html',
  styleUrls: ['./card-processo.component.css']
})
export class CardDocumentosProcessoComponent implements OnInit {
  public tituloCard?: string;
  public listaDocumentos: Array<DocumentosProcessoDTO> = new Array<DocumentosProcessoDTO>();
  public documento_I: ArquivoDTO;
  public documento_II: ArquivoDTO;

  @Input() arquivos: Array<ArquivoDTO>;

  constructor(protected sharedService: SharedService) {}

  ngOnInit() {
    this.tituloCard = 'Documentos do Processo';
    this.buildDocVariables();
  }

  buildDocVariables() {
    if (!!this.arquivos) {
      this.documento_I =
        this.arquivos.filter(x => x.tipoDocumento === 'ARQUIVO_I').length > 0
          ? this.arquivos.filter(x => x.tipoDocumento === 'ARQUIVO_I')[0]
          : null;
      this.documento_II =
        this.arquivos.filter(x => x.tipoDocumento === 'ARQUIVO_II').length > 0
          ? this.arquivos.filter(x => x.tipoDocumento === 'ARQUIVO_II')[0]
          : null;
      this.setDocumentos();
    }
  }

  setDocumentos() {
    this.listaDocumentos.push({
      labelDocumentoPrimario: 'Arquivo_I',
      tipoDocumentoPrimario: this.documento_I !== null ? this.documento_I.tipoDocumento : '-',
      nomeDocumentoPrimario: this.documento_I !== null ? this.documento_I.nomeArquivo : '-',
      linkDocumentoPrimario: this.documento_I !== null ? this.documento_I.downloadUri : '-',
      labelDocumentoSecundario: 'Arquivo_II',
      tipoDocumentoSecundario: this.documento_II !== null ? this.documento_II.tipoDocumento : '-',
      nomeDocumentoSecundario: this.documento_II !== null ? this.documento_II.nomeArquivo : '-',
      linkDocumentoSecundario: this.documento_II !== null ? this.documento_II.downloadUri : '-'
    });  
  }

  download(url: string, nome: string) {
    if (!!url && url !== '-') {
      this.sharedService.download(url).subscribe(res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, nome + this.sharedService.getArquivoExtensao(url));
        } else {
          // saveAs(blob, nome);
        }
      });
    }
  }
}
