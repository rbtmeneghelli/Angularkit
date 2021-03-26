import { AuditoriaViewComponent } from './auditoria-view.component';
import { ListaAuditoriaComponent } from './lista-auditoria.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: ListaAuditoriaComponent, canActivate: [AuthGuard], data: {
      allowedRoles: ['ROLE_LOG']
    }
  },
  { path: ':id', component: AuditoriaViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuditoriaRoutingModule { }
