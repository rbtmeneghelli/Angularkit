import { ListaFilterComponent } from './lista-filter/lista-filter.component';
import { ListaComponent } from './lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../../app_entities/library/shared.module';
import { ListaRoutingModule } from './lista.route';
// tslint:disable-next-line: max-line-length
import { TemplateTabelaMaterialGenericaComponent } from '../../tabela/template-tabela-material-generica/template-tabela-material-generica.component';
// tslint:disable-next-line: max-line-length
import { TemplateTabelaMaterialGenericaFilterComponent } from '../../tabela/template-tabela-material-generica/template-tabela-material-generica-filter/template-tabela-material-generica-filter.component';
import { CardFilterComponent } from '../../shared/card-filter/card-filter.component';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    ListaComponent,
    ListaFilterComponent,
    TemplateTabelaMaterialGenericaComponent,
    TemplateTabelaMaterialGenericaFilterComponent,
    CardFilterComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    ListaRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: []
})
export class ListaModule {}
