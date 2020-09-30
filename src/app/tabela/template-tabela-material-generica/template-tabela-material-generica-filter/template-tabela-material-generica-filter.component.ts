import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-template-tabela-material-generica-filter',
    templateUrl: './template-tabela-material-generica-filter.component.html'
})

export class TemplateTabelaMaterialGenericaFilterComponent implements OnInit {

    public arrHeaders?: any[];
    public checked?: boolean;

    constructor(
        protected dialogRef: MatDialogRef<TemplateTabelaMaterialGenericaFilterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.arrHeaders = this.data.columnHeader;
        this.checked = false;
    }

    selectAll(checked): void {
        this.checked = checked === false ? true : false;
        if (this.checked) {
            for (const item of this.arrHeaders) {
                item.status = true;
            }
        } else {
            for (const item of this.arrHeaders) {
                item.status = false;
            }
        }
    }

    selectItem(item?: any): void {
        const itemIsChecked: boolean = this.arrHeaders.find(x => x.id === item.id).status;
        this.arrHeaders.find(x => x.id === item.id).status = itemIsChecked ? false : true;
    }

    exportExcel(): void {
        const arrItemSelected: string[] = [];
        for (const item of this.arrHeaders) {
            if (item.status) {
                arrItemSelected.push(item.campo);
            }
        }
        if (!!arrItemSelected && arrItemSelected.length > 0) {
        } else {
            alert('Para exportar o excel, ao menos um campo deve ser selecionado.');
        }
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}
