import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidarSelect } from '../../app_business/service/shared.service';
@Component({
    selector: 'app-template-upload-dropzone',
    templateUrl: './template-upload-dropzone.component.html'
})

export class UploadComponent implements OnInit {

    public carregando = true;
    public erros: string[];
    public titulo: string;
    public files: File[] = [];
    public formulario: FormGroup;
    public countArquivos: number;
    public enableBtnCancelar: boolean;

    // tslint:disable-next-line: max-line-length
    constructor(protected formBuilder: FormBuilder) {
        this.formulario = this.formBuilder.group({
            OBRIGACAO: ['0', [Validators.required, ValidarSelect]]
        });
    }

    ngOnInit() {
        this.countArquivos = 1;
        this.titulo = 'Upload de arquivos';
        this.getObrigacoes();
    }

    getObrigacoes() {
    }

    onSelect(event) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
    }

    checkArrFile() {
        return this.files.length === 0;
    }

    btnCancelar() {
        this.files = [];
        this.countArquivos = 0;
        this.formulario.controls.OBRIGACAO.setValue('0');
    }

    btnEnviar() {
        this.checkFileType();
    }

    checkFileType() {
        this.enableBtnCancelar = true;
        this.carregando = true;
        for (const file of this.files) {
            switch (file.type) {
                case 'text/plain':
                    this.sendFileToUpload(file);
                    break;
                case 'application/x-zip-compressed':
                    this.sendFileToUpload(file);
                    break;
            }
        }
    }

    sendFileToUpload(file: File) {
        const formData: FormData = new FormData();
        formData.append('Arquivo', file);
        formData.append('ObrigacaoId', this.formulario.controls.OBRIGACAO.value);
        formData.append('UsuarioId', '1');
        // this.uploadService.sendFile(formData).subscribe(response => {
        //     this.finishDownload();
        // },
        //     error => {
        //         alert('erro');
        //     });
    }

    finishDownload() {
        if (this.countArquivos === this.files.length) {
            this.btnCancelar();
            this.carregando = false;
            this.enableBtnCancelar = false;
        } else {
            this.countArquivos++;
        }
    }
}
