import { BancoService } from '../../app_business/service/banco.service';
import { Banco } from '../../app_entities/model/banco.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardCabecalhoDTO } from '../../app_entities/dto/cardCabecalho.dto';
import { take } from 'rxjs/operators';
import { getHeaderSettings } from 'src/app/app_business/shared/shared-functions';

@Component({
  selector: 'app-banco-view',
  templateUrl: './banco-view.component.html'
})

export class BancoViewComponent implements OnInit {
  public cardCabecalhoDTO: CardCabecalhoDTO = getHeaderSettings('Formulario Banco','Cadastro','Banco');
  public banco: Banco = new Banco();
  constructor(
    private readonly bancoService: BancoService,
    private readonly activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.load(params.id);
    });
  }

  load(id: number) {
    this.bancoService.getById(id).pipe(take(1)).subscribe(response => {
      this.banco = response;
    });
  }
}

