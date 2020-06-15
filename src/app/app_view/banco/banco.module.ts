import { SharedModule } from '../../app_entities/library/shared.module';
import { ListaBancoComponent } from './lista-banco.component';
import { BancoService } from '../../app_business/service/banco.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BancoRoutingModule } from './banco.route';
import { BancoComponent } from './banco.component';
import { BancoViewComponent } from './banco-view.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaBancoComponent,
    BancoComponent,
    BancoViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    BancoRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [BancoService]
})
export class BancoModule {}
