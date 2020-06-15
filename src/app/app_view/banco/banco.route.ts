import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BancoComponent } from './banco.component';
import { ListaBancoComponent } from './lista-banco.component';
import { BancoViewComponent } from './banco-view.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ListaBancoComponent, canActivate: [AuthGuard] },
  { path: 'new', component: BancoComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: BancoComponent, canActivate: [AuthGuard] },
  { path: ':id', component: BancoViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BancoRoutingModule { }
