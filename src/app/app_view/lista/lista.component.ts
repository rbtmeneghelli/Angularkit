import { SharedVariables } from 'src/app/app_business/shared/shared-variables';
import { CardCabecalhoDTO } from './../../app_entities/dto/cardCabecalho.dto';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

    public cardCabecalhoDTO: CardCabecalhoDTO;
    public tableData?: any[] = [
        { Id: 1, Nome: 'Teste', Idade: 18, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 2, Nome: 'ABC', Idade: 30, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 3, Nome: 'DFG', Idade: 28, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 4, Nome: 'HIJ', Idade: 23, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 5, Nome: 'KLM', Idade: 22, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 6, Nome: 'NOP', Idade: 26, DataNascimento: SharedVariables.CURRENT_DATE},
        { Id: 7, Nome: 'RST', Idade: 40, DataNascimento: SharedVariables.CURRENT_DATE}
    ];
    public columnHeader?: any = {Id: 'Id', Nome: 'Nome', Idade: 'Idade', DataNascimento: 'Ano'}; // Objeto
    public pageSize?: number;

    constructor() {
        this.cardCabecalhoDTO = new CardCabecalhoDTO();
    }

    ngOnInit(): void {
        this.cardCabecalhoDTO.tituloCard = 'Lista de resultados';
        this.cardCabecalhoDTO.tituloModulo = 'Formulários';
        this.cardCabecalhoDTO.nomeTela = 'Resultados';
        this.pageSize = 7;
    }
}
