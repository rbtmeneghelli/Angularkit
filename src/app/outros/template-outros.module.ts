import { TemplatePerfilAcessoComponent } from '../outros/template-perfil-acesso/template-perfil-acesso.component';
import { TemplateUploadComponent } from '../outros/template-upload/template-upload.component';
import { TemplateErroComponent } from '../outros/template-erro/template-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from '../app_entities/library/angularmaterial.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SharedModule } from '../app_entities/library/shared.module';
import { TemplateOutrosRoutingModule } from './template-outros.route';
import { UploadComponent } from './template-upload-dropzone/template-upload-dropzone.component';
import { TemplateRelatorioComponent } from './template-relatorio/template-relatorio.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);
@NgModule({
  declarations: [
    TemplatePerfilAcessoComponent,
    TemplateUploadComponent,
    TemplateErroComponent,
    UploadComponent,
    TemplateRelatorioComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    SharedModule,
    TemplateOutrosRoutingModule,
    NgxMaskModule.forRoot(options)
  ],
  exports: [
  ],
  entryComponents: [
  ],
  providers: []
})
export class TemplateOutrosModule {}

