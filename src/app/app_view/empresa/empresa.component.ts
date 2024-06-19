import { Empresa } from './../../app_entities/model/empresa.model';
import { EmpresaService } from './../../app_business/service/empresa.service';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { FORMULARIO_EMPRESA } from 'src/app/app_entities/forms/empresa.form';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html'
})

export class EmpresaComponent extends BaseFormComponent implements OnInit {
    constructor(
        private readonly sharedService: SharedService,
        private readonly formBuilder: FormBuilder,
        public readonly empresaService: EmpresaService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly sharedNotificationService: SharedNotificationService
    ) {
        super();
        this.formulario = FORMULARIO_EMPRESA;
    }

    ngOnInit() {
        this.getHeaderPage('Formulario Empresa', 'Cadastro', 'Empresa');
        this.activatedRoute.params.subscribe(params => {
            if (!!params.id) {
                this.updateForm(params.id);
            } else {
                this.registroNovo = true;
                this.bloquearCampo = false;
            }
        });
    }

    updateForm(id: number) {
        this.empresaService.getById(id).pipe(take(1)).toPromise().then(response => {
            this.formulario.get('ID').setValue(id);
            this.formulario.get('CNPJ').setValue(response.cnpj);
            this.formulario.get('NOMEEMPRESA').setValue(response.nomeEmpresa);
            this.formulario.get('NOMEFANTASIA').setValue(response.nomeFantasia);
            this.formulario.get('STATUS').setValue(response.status ? '1' : '0');
            this.registroNovo = false;
            this.bloquearCampo = true;
        }).catch(error => alert('erro'));
    }

    hasErrorFormControl(formControl: AbstractControl): string {
        return hasErrorFormControl(formControl);
    }


    buildEntity(): Empresa {
        const empresa: Empresa = new Empresa();
        empresa.cnpj = this.formulario.get('CNPJ').value;
        empresa.nomeEmpresa = this.formulario.get('NOMEEMPRESA').value;
        empresa.nomeFantasia = this.formulario.get('NOMEFANTASIA').value;
        empresa.status = this.formulario.get('STATUS').value === '0' ? false : true;
        if (this.registroNovo) {
            empresa.dataCriacao = SharedVariables.CURRENT_DATE;
        } else {
            empresa.dataAtualizacao = SharedVariables.CURRENT_DATE;
        }
        return empresa;
    }

    saveForm() {
        if (this.registroNovo) {
            this.empresaService.create(this.buildEntity()).pipe(take(1)).toPromise().then(response => {
                this.sharedNotificationService.enviarNotificacaoToRoute('', 'empresa cadastrado com sucesso', 'success', '/empresa');
            }, error => {
                this.sharedNotificationService.enviarNotificacao('', 'Erro ao cadastrar o novo empresa', 'error');
            });
        } else {
            this.empresaService.update(this.formulario.get('ID').value, this.buildEntity()).pipe(take(1)).toPromise().then(response => {
                this.sharedNotificationService.enviarNotificacaoToRoute('', 'empresa atualizado com sucesso', 'success', '/empresa');
            }, error => {
                this.sharedNotificationService.enviarNotificacao('', 'Erro ao atualizar os dados do empresa', 'error');
            });
        }
    }
}
