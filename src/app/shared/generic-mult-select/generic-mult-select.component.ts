import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultSelectList } from 'src/app/app_entities/generic/multselectlist';
import { DadosConstant } from 'src/app/app_entities/constants/dados.constant';
import { isArray } from 'util';
import { arrNumber } from 'src/app/app_business/shared/shared-types';

@Component({
    selector: 'app-dropdown-multi-select',
    templateUrl: './segmento-dropdown-multi-select.component.html',
    styleUrls: ['./segmento-dropdown-multi-select.component.scss']
})

export class SegmentoDropDownMultiSelectComponent implements OnInit, OnChanges {

    @Input() nomeLabel: string = 'Segmento';
    @Input() list: MultSelectList[] = DadosConstant;
    @Input() isRequired: boolean = false;
    @Input() disabled: boolean = false;
    @Input() controlForm!: FormGroup;

    @Output() compartilharItensSelecionados = new EventEmitter();

    public mostrarDropDown: boolean = false;
    public campoObrigatorio: string = 'Campo obrigatório não preenchido';
    public itensList: MultSelectList[] = [];
    public opcaoPadrao: arrNumber = [];
    public tempo: any;
    public opcaoEscolhida!: string;

    constructor() {
    }

    setValues(value: string) {
        if (isArray(value) && !!this.list) {
            this.preencherDropDown();
        }
    }

    ngOnInit() {
        if (this.disabled) {
            this.controlForm.disable();
        }

        let handleFormChanges = this.controlForm.controls['teste'
        ].valueChanges.subscribe((value) => {
            this.setValues(value);
            handleFormChanges.unsubscribe();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setValues(this.controlForm.controls['teste'].value);
    }

    public retornarSelecionadosPorNome(): string {
        return this.itensList.length > 0 ? this.itensList.map(param => param.viewValue).join(', ') : '';
    }

    public retornarSelecionadosPorId(): arrNumber {
        const arrItens: arrNumber = [];
        if (this.itensList.length > 0) {
          this.itensList.map((param) => {
            arrItens.push(param.value as unknown as number);
          });
        }
    
        return arrItens;
    }

    public getItensSelecionados(item: MultSelectList): void {

        if (item?.marcado) {
            var index = this.itensList.findIndex(param => param.value === item.value);
            this.itensList.splice(index, 1);
            const itemSelecionado = this.list.findIndex(x => x.value == item.value);
            this.list[itemSelecionado].marcado = false;
        } else {
            this.itensList.push(item);
            const itemSelecionado = this.list.findIndex(x => x.value == item.value);
            this.list[itemSelecionado].marcado = true;
        }

        this.opcaoEscolhida = this.retornarSelecionadosPorNome();
        this.compartilharSegmentosSelecionados();
    }

    public ocultarDropDown(): void {
        if (this.mostrarDropDown) {
            this.controlForm.controls['teste'].enable();
            this.mostrarDropDown = !this.mostrarDropDown;
            // } else if (this._app.isMobile()) {
            //     this.ocultarDropDownMobile();
            // }
        } else {
            this.controlForm.controls['teste'].disable();
            this.mostrarDropDown = !this.mostrarDropDown;
        }
    }

    private preencherDropDown(): void {
        if (this.list.length > 0) {
            for (const item of this.controlForm.controls['teste'].value) {
                const itemSelecionado = this.list.findIndex((x) => x.value == item);
                this.list[itemSelecionado].marcado = true;
                this.itensList.push(this.list[itemSelecionado]);
            }
            this.opcaoPadrao = this.retornarSelecionadosPorId();
            this.opcaoEscolhida = this.retornarSelecionadosPorNome();
        }
    }

    private ocultarDropDownMobile(): void {
        this.controlForm.controls['teste'].disable();
        this.mostrarDropDown = !this.mostrarDropDown;
        clearTimeout(this.tempo);
        setTimeout(() => {
            if (this.controlForm.controls['teste'].disabled) {
                this.controlForm.controls['teste'].enable();
                this.mostrarDropDown = false;
            }
        }, 10000);
    }

    private compartilharSegmentosSelecionados(): void {
        this.opcaoPadrao = this.retornarSelecionadosPorId();
        this.controlForm.controls['teste'].setValue(this.opcaoPadrao);
        this.compartilharItensSelecionados.emit(this.controlForm.controls['teste'].value);
    }

    public limparDropDown(): void {
        this.itensList = []
        for (const item of this.list) {
            item.marcado = false
        }
    }
}