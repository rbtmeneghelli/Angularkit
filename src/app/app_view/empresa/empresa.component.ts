import { Empresa } from './../../app_entities/model/empresa.model';
import { EmpresaService } from './../../app_business/service/empresa.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../app_business/service/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';
import { statusList } from 'src/app/app_entities/shared/shared-lists';
import { arrDropDownList } from 'src/app/app_entities/shared/shared-types';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';
import { hasErrorFormControl } from 'src/app/app_business/shared/shared-functions-string';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';

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
        super('Formulario Empresa', 'Cadastro', 'Empresa');
        this.formulario = this.formBuilder.group({
            ID: [''],
            CNPJ: ['', [Validators.required, this.ValidarCnpj]],
            NOMEEMPRESA: ['', Validators.required],
            NOMEFANTASIA: ['', Validators.required],
            STATUS: ['', Validators.required]
        });
    }

    ngOnInit() {
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

    salvar() {
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

    ValidarCnpj(controle: AbstractControl) {
        let cnpj = controle.value;

        if (cnpj === undefined) {
            return { cnpjInvalido: true };
        }
        if (cnpj === '' || cnpj.length !== 14 || cnpj === undefined) {
            return { cnpjInvalido: true };
        }

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (
            cnpj === '00000000000000' ||
            cnpj === '11111111111111' ||
            cnpj === '22222222222222' ||
            cnpj === '33333333333333' ||
            cnpj === '44444444444444' ||
            cnpj === '55555555555555' ||
            cnpj === '66666666666666' ||
            cnpj === '77777777777777' ||
            cnpj === '88888888888888' ||
            cnpj === '99999999999999'
        ) {
            return { cnpjInvalido: true };
        }

        let resultado = 0;
        let tamanho: number = cnpj.length - 2;
        let numeros: string = cnpj.substring(0, tamanho);
        const digitos: string = cnpj.substring(tamanho);

        let soma = 0;
        let pos = tamanho - 7;
        let resSoma: number;
        for (let i = tamanho; i >= 1; i--) {
            resSoma = tamanho - i;
            // tslint:disable-next-line: radix
            soma += parseInt(numeros.charAt(resSoma)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== Number(digitos.charAt(0))) {
            return { cnpjInvalido: true };
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            resSoma = tamanho - i;
            // tslint:disable-next-line: radix
            soma += parseInt(numeros.charAt(resSoma)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== Number(digitos.charAt(1))) {
            return { cnpjInvalido: true };
        }

        return null;
    }
}
