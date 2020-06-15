import { TemplateTabelaComponent } from '../tabela/template-tabela/template-tabela.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TemplateTabelaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TemplateTabelaRoutingModule { }

