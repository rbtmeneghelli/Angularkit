import { ClienteViewComponent } from './cliente-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';

import { ClienteComponent } from './cliente.component';
// import { CardCabecalhoComponent } from './../shared/card-cabecalho/card-cabecalho.component';
import { ListaClienteComponent } from './lista-cliente.component';
import { ModalClienteComponent } from './modal-cliente.component';
import { ClienteService } from '../../app_business/service/cliente.service';
import { ClienteRoutingModule } from './cliente.route';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../../app_entities/library/shared.module';
import { ListaClienteBackComponent } from './lista-cliente-back.component';
import { ClienteFilterComponent } from './cliente-filter.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaClienteComponent,
    ModalClienteComponent,
    ClienteComponent,
    ClienteViewComponent,
    ListaClienteBackComponent,
    ClienteFilterComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    ClienteRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  entryComponents: [
    ModalClienteComponent,
    ClienteFilterComponent
  ],
  providers: [ClienteService]
})
export class ClienteModule {}
