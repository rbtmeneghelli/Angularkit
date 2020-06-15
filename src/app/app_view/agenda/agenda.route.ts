import { AuthGuard } from 'src/app/guards/auth.guard';
import { AgendaViewComponent } from './agenda-view.component';
import { AgendaComponent } from './agenda.component';
import { ListaAgendaComponent } from './lista-agenda.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListaAgendaComponent, canActivate: [AuthGuard] },
  { path: 'new', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: ':id', component: AgendaViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AgendaRoutingModule { }
