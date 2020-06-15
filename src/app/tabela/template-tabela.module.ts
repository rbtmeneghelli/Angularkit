import { TemplateTabelaComponent } from '../tabela/template-tabela/template-tabela.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../app_entities/library/shared.module';
import { TemplateTabelaRoutingModule } from '../tabela/template-tabela.route';
export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    TemplateTabelaComponent,
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    TemplateTabelaRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: []
})
export class TemplateTabelaModule { }

