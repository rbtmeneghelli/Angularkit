import { EmpresaViewComponent } from './empresa-view.component';
import { EmpresaComponent } from './empresa.component';
import { ListaEmpresaComponent } from './lista-empresa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaEmpresaComponent, canActivate: [AuthGuard] },
  { path: 'new', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: EmpresaComponent, canActivate: [AuthGuard] },
  { path: ':id', component: EmpresaViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EmpresaRoutingModule { }
