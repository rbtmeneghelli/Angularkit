import { FuncionalidadeService } from './../../app_business/service/funcionalidade.service';
import { FuncionalidadeComponent } from './funcionalidade.component';
import { ListaFuncionalidadeComponent } from './lista-funcionalidade.component';
import { SharedModule } from '../../app_entities/library/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FuncionalidadeViewComponent } from './funcionalidade-view.component';
import { FuncionalidadeRoutingModule } from './funcionalidade.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaFuncionalidadeComponent,
    FuncionalidadeComponent,
    FuncionalidadeViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    FuncionalidadeRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [FuncionalidadeService]
})
export class FuncionalidadeModule {}
