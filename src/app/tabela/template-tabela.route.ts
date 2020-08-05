import { TemplateTabelaBootstrapComponent } from './template-tabela-bootstrap/template-tabela-boostrap.component';
import { TemplateTabelaComponent } from '../tabela/template-tabela/template-tabela.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TemplateTabelaComponent },
  { path: 'tbBootstrap', component: TemplateTabelaBootstrapComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TemplateTabelaRoutingModule { }

