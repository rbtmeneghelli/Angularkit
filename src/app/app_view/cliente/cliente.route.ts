import { ClienteViewComponent } from './cliente-view.component';
import { ClienteComponent } from './cliente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClienteComponent } from './lista-cliente.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaClienteComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ClienteViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ClienteRoutingModule { }
