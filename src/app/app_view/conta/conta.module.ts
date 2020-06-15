import { ContaService } from './../../app_business/service/conta.service';
import { ContaViewComponent } from './conta-view.component';
import { ContaComponent } from './conta.component';
import { ListaContaComponent } from './lista-conta.component';
import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ContaRoutingModule } from './conta.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaContaComponent,
    ContaComponent,
    ContaViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    ContaRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [ContaService]
})
export class ContaModule {}
