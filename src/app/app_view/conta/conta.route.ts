import { ContaViewComponent } from './conta-view.component';
import { ContaComponent } from './conta.component';
import { ListaContaComponent } from './lista-conta.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaContaComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ContaComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ContaComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ContaViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContaRoutingModule { }
