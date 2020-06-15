import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cabecalho',
  templateUrl: './card-cabecalho.component.html',
  styleUrls: ['./card-cabecalho.component.css']
})
export class CardCabecalhoComponent implements OnInit {

  @Input() cardCabecalhoDTO: CardCabecalhoDTO;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  voltarHome() {
    this.route.navigate(['/']);
  }
}

