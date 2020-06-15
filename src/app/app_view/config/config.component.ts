import { Component, OnInit } from '@angular/core';
import { CardCabecalhoDTO } from 'src/app/app_entities/dto/cardCabecalho.dto';

@Component({
    selector: 'app-config',
    templateUrl: 'config.component.html',
    styleUrls: ['config.component.scss'],
})

export class ConfigComponent implements OnInit {
    public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
    // tslint:disable-next-line: max-line-length
    public listaLog: string[] = ['Gravar log ao acessar o sistema', 'Gravar log ao deslogar do sistema', 'Gravar log ao cadastrar um novo registro', 'Gravar log ao editar um registro', 'Gravar log ao excluir um registro'];
    public listaEmail: string[] = ['Habilitar Ssl', 'Utilizar Url de Dev'];
    ngOnInit(): void {
    this.cardCabecalhoDTO.tituloCard = 'Configuração do Sistema';
    this.cardCabecalhoDTO.tituloModulo = 'Configuração';
    this.cardCabecalhoDTO.nomeTela = 'Configuração';
    }
}
