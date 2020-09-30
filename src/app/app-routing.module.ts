import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'outros', loadChildren: () => import('./outros/template-outros.module').then(m => m.TemplateOutrosModule) },
  { path: 'cliente', loadChildren: () => import('./app_view/cliente/cliente.module').then(m => m.ClienteModule) },
  { path: 'banco', loadChildren: () => import('./app_view/banco/banco.module').then(m => m.BancoModule) },
  { path: 'auditoria', loadChildren: () => import('./app_view/auditoria/auditoria.module').then(m => m.AuditoriaModule) },
  { path: 'agenda', loadChildren: () => import('./app_view/agenda/agenda.module').then(m => m.AgendaModule) },
  { path: 'conta', loadChildren: () => import('./app_view/conta/conta.module').then(m => m.ContaModule) },
  // tslint:disable-next-line: max-line-length
  { path: 'funcionalidade', loadChildren: () => import('./app_view/funcionalidade/funcionalidade.module').then(m => m.FuncionalidadeModule) },
  { path: 'servico', loadChildren: () => import('./app_view/servico/servico.module').then(m => m.ServicoModule) },
  { path: 'empresa', loadChildren: () => import('./app_view/empresa/empresa.module').then(m => m.EmpresaModule) },
  { path: 'config', loadChildren: () => import('./app_view/config/config.module').then(m => m.ConfigModule) },
  { path: '', loadChildren: () => import('./outros/template-outros.module').then(m => m.TemplateOutrosModule) },
  { path: 'lista', loadChildren: () => import('./app_view/lista/lista.module').then(m => m.ListaModule) }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

