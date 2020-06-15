import { Component, OnInit, Input } from '@angular/core';
import { Aios } from '../../app_entities/model/aio.model';

@Component({
  selector: 'app-detalhes-tabela',
  templateUrl: './detalhes-tabela.component.html',
  styleUrls: ['./detalhes-tabela.component.css']
})
export class DetalhesTabelaComponent implements OnInit {

  @Input() dados: Aios;

  constructor() { }

  ngOnInit() {
  }

}
