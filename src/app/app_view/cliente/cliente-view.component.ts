import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../guards/auth.guard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { ClienteService } from '../../app_business/service/cliente.service';
import { Cliente } from '../../app_entities/model/cliente.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html'
})

export class ClienteViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = new CardCabecalhoDTO();
  public cliente: Cliente = new Cliente();
  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.cardCabecalhoDTO.tituloCard = 'Formulario Cliente';
    this.cardCabecalhoDTO.tituloModulo = 'Cadastro';
    this.cardCabecalhoDTO.nomeTela = 'Cliente';
    this.activatedRoute.params.subscribe(params => {
      this.load(params.id);
    });
  }

  load(id: number) {
    this.clienteService.getById(id).pipe(take(1)).subscribe(response => {
      this.cliente = response;
    });
  }
}

