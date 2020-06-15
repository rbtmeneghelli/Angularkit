import { EmpresaService } from './../../app_business/service/empresa.service';
import { EmpresaViewComponent } from './empresa-view.component';
import { EmpresaComponent } from './empresa.component';
import { ListaEmpresaComponent } from './lista-empresa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../../app_entities/library/shared.module';
import { EmpresaRoutingModule } from './empresa.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaEmpresaComponent,
    EmpresaComponent,
    EmpresaViewComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    EmpresaRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [EmpresaService]
})
export class EmpresaModule {}
