import { FuncionalidadeViewComponent } from './funcionalidade-view.component';
import { FuncionalidadeComponent } from './funcionalidade.component';
import { ListaFuncionalidadeComponent } from './lista-funcionalidade.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaFuncionalidadeComponent, canActivate: [AuthGuard] },
  { path: 'new', component: FuncionalidadeComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: FuncionalidadeComponent, canActivate: [AuthGuard] },
  { path: ':id', component: FuncionalidadeViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FuncionalidadeRoutingModule { }
