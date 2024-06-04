import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { ClienteService } from '../../app_business/service/cliente.service';
import { Cliente } from '../../app_entities/model/cliente.model';
import { take } from 'rxjs/operators';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html'
})

export class ClienteViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Cliente','Cadastro','Cliente');
  public cliente: Cliente = new Cliente();
  constructor(
    private readonly clienteService: ClienteService,
    private readonly activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
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

