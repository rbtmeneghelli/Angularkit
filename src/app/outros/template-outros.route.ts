import { TemplatePerfilAcessoComponent } from '../outros/template-perfil-acesso/template-perfil-acesso.component';
import { TemplateUploadComponent } from '../outros/template-upload/template-upload.component';
import { TemplateErroComponent } from '../outros/template-erro/template-erro.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { UploadComponent } from './template-upload-dropzone/template-upload-dropzone.component';
import { TemplateRelatorioComponent } from './template-relatorio/template-relatorio.component';

const routes: Routes = [
  { path: 'perfil', component: TemplatePerfilAcessoComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: TemplateUploadComponent, canActivate: [AuthGuard] },
  { path: 'erro', component: TemplateErroComponent, canActivate: [AuthGuard] },
  { path: 'upload2', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'relatorio', component: TemplateRelatorioComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TemplateOutrosRoutingModule { }
