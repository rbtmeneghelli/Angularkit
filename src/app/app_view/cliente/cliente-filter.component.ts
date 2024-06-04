import { ClienteFilterData } from '../../app_entities/filter/cliente-filter-data.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-cliente-filter',
    templateUrl: './cliente-filter.component.html'
})

export class ClienteFilterComponent implements OnInit {
    public formulario: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ClienteFilterComponent>,
        protected router: Router,
        protected formBuilder: FormBuilder,
    ) {
        this.formulario = formBuilder.group({
            CPF: [''],
            NOME: [''],
        });
    }

    ngOnInit(): void {

    }

    fechar() {
        this.dialogRef.close();
    }

    pesquisar() {
        const clienteFilterData: ClienteFilterData = new ClienteFilterData();
        clienteFilterData.cpf = this.formulario.controls.CPF.value;
        clienteFilterData.nomeCliente = this.formulario.controls.NOME.value;
        this.dialogRef.close({ filtro: clienteFilterData });
    }
}
