import { AgendaViewComponent } from './agenda-view.component';
import { AgendaService } from './../../app_business/service/agenda.service';
import { AgendaComponent } from './agenda.component';
import { ListaAgendaComponent } from './lista-agenda.component';
import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AgendaRoutingModule } from './agenda.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaAgendaComponent,
    AgendaComponent,
    AgendaViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    AgendaRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [AgendaService]
})
export class AgendaModule {}
