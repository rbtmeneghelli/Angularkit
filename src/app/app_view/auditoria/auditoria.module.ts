import { AuditoriaService } from './../../app_business/service/auditoria.service';
import { ListaAuditoriaComponent } from './lista-auditoria.component';
import { AuditoriaViewComponent } from './auditoria-view.component';
import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AuditoriaRoutingModule } from './auditoria.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaAuditoriaComponent,
    AuditoriaViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    AuditoriaRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [AuditoriaService]
})
export class AuditoriaModule {}
