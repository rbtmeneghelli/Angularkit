import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MultSelectList } from 'src/app/app_entities/generic/multselectlist';
import { DadosConstant } from 'src/app/app_entities/constants/dados.constant';

@Component({
    selector: 'app-dropdown-multi-select',
    templateUrl: './segmento-dropdown-multi-select.component.html',
    styleUrls: ['./segmento-dropdown-multi-select.component.scss']
})

export class SegmentoDropDownMultiSelectComponent implements OnInit {

    @Input() nomeLabel: string = 'Segmento';
    @Input() list: MultSelectList[] = DadosConstant;
    @Input() isRequired: boolean = false;
    @Input() disabled: boolean = false;
    @Input() controlForm!: FormGroup;

    @Output() compartilharItensSelecionados = new EventEmitter();

    public mostrarDropDown: boolean = false;
    public campoObrigatorio: string = 'Campo obrigatório não preenchido';
    public segmentoList: MultSelectList[] = [];
    public optionDefault: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    public retornarSegmentosSelecionadosPorNome(): string {
        return this.segmentoList.length > 0 ? this.segmentoList.map(param => param.viewValue).join(', ') : '';
    }

    public retornarSegmentosSelecionadosPorId(): string {
        return this.segmentoList.length > 0 ? this.segmentoList.map(param => param.value).join(', ') : '';
    }

    public getItensSelecionados(item: MultSelectList): void {

        if (item?.marcado) {
            var index = this.segmentoList.findIndex(param => param.value === item.value);
            this.segmentoList.splice(index, 1);
            const itemSelecionado = this.list.findIndex(x => x.value == item.value);
            this.list[itemSelecionado].marcado = false;
        } else {
            this.segmentoList.push(item);
            const itemSelecionado = this.list.findIndex(x => x.value == item.value);
            this.list[itemSelecionado].marcado = true;
        }

        this.compartilharSegmentosSelecionados();
    }

    public ocultarDropDown(): void {
        this.mostrarDropDown = !this.mostrarDropDown;
        if (this.mostrarDropDown) {
            this.controlForm.controls['segmento'].disable();
        } else {
            this.controlForm.controls['segmento'].enable();
        }
    }

    private compartilharSegmentosSelecionados(): void {
        this.optionDefault = this.retornarSegmentosSelecionadosPorId();
        this.controlForm.controls['segmento'].setValue(!!this.optionDefault ? this.optionDefault : null);
        this.compartilharItensSelecionados.emit(this.controlForm.controls['segmento'].value);
    }
}