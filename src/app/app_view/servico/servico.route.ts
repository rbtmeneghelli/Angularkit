import { ServicoComponent } from './servico.component';
import { ListaServicoComponent } from './lista-servico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoViewComponent } from './servico-view.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaServicoComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ServicoComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ServicoComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ServicoViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ServicoRoutingModule { }
