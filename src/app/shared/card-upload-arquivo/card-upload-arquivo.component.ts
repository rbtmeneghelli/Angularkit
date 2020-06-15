import { SharedService } from './../../app_business/service/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';
import { ArquivoDTO } from '../../app_entities/dto/arquivo.dto';
import { EnumTipoDocumento } from '../../app_entities/enum/EnumTipoDocumento';
import { ArquivoService } from '../../app_business/service/arquivo.service';

@Component({
    selector: 'app-upload-arquivo',
    templateUrl: './card-upload-arquivo.component.html'
})
export class UploadArquivoModalComponent implements OnInit {
  public formulario: FormGroup;
  public fileName?: string;
  public showBtnConfirmar: boolean;
  @Input() closeModal: any;
  @Output() statusUpload: EventEmitter<boolean> = new EventEmitter();
  constructor(
    protected formBuilder: FormBuilder,
    protected sharedService: SharedService,
    protected arquivoService: ArquivoService
  ) {
    this.formulario = this.formBuilder.group({
      NOMEARQUIVO: ['', []],
      ARQUIVO: ['', []]
    });
  }

  ngOnInit() {
    this.fileName = 'Nenhum Arquivo Selecionado';
    this.showBtnConfirmar = false;
  }

  async processFile(event: any) {
    if (this.checkFileSize(event.target.files[0])) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.formulario.get('ARQUIVO').setValue(event.target.files[0]);
        this.fileName = event.target.files[0].name;
        this.showBtnConfirmar = true;
      };
    }
  }

  async checkFileSize(file: any) {
    const FileSize = file.size / 1024 / 1024;
    if (FileSize < 10) {
      return true;
    } else {
      this.sharedService.enviarNotificacao('', 'O arquivo excede o tamanho máximo de 10MB', 'error');
    }
    return false;
  }

  sendFile() {
    Swal.fire({
      title: '',
      text: 'Deseja confirmar o upload do arquivo para o sistema',
      type: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c3c3c3',
      cancelButtonColor: '#c3c3c3',
      confirmButtonText: 'Confirmar'
    })
      .then(result => {
        if (result.value) {
          this.arquivoService
            .sendFile(this.buildFile(), this.formulario.get('ARQUIVO').value)
            .pipe(take(1))
            .subscribe(
              response => {
                this.sendStatusUpload(true);
                this.sharedService.enviarNotificacao('', 'Upload do arquivo efetuado com sucesso', 'success');
              },
              error => {
                this.sendStatusUpload(false);
                this.sharedService.enviarNotificacao('', 'Erro para efetuar o upload do arquivo', 'error');
              }
            );
        }
      })
      .catch(err => {});
  }

  buildFile(): ArquivoDTO {
    const arquivoDTO: ArquivoDTO = new ArquivoDTO();
    arquivoDTO.id = null;
    arquivoDTO.nomeArquivo = this.formulario.get('NOMEARQUIVO').value;
    arquivoDTO.descricaoArquivo = this.fileName;
    arquivoDTO.tipoDocumento = EnumTipoDocumento.Word.toString();
    arquivoDTO.downloadUri = '';
    return arquivoDTO;
  }

  sendStatusUpload(status: boolean) {
    this.statusUpload.emit(status);
  }
}
