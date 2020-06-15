import { ServicoService } from './../../app_business/service/servico.service';
import { ServicoComponent } from './servico.component';
import { ListaServicoComponent } from './lista-servico.component';
import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ServicoViewComponent } from './servico-view.component';
import { ServicoRoutingModule } from './servico.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaServicoComponent,
    ServicoComponent,
    ServicoViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    ServicoRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [ServicoService]
})
export class ServicoModule {}
