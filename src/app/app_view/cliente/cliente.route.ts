import { Injectable, NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterModule, Routes } from "@angular/router";
import { take, tap } from 'rxjs/operators';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ClienteViewComponent } from './cliente-view.component';
import { ClienteComponent } from './cliente.component';
import { ListaClienteBackComponent } from './lista-cliente-back.component';
import { ClienteService } from "src/app/app_business/service/cliente.service";

@Injectable({
  providedIn: 'root'
})

export class ClientResolveService implements Resolve<any> {

  constructor(private _clienteService: ClienteService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return await this._clienteService.getById(route.params.id).pipe(take(1), tap(x => console.log('Dados: ', x))).pipe(take(1)).toPromise().then((response: any) => {
      return response?.data;
    }).catch(error => {
    });
  }
}

const routes: Routes = [
  { path: '', component: ListaClienteBackComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: ':id/detalhes', component: ClienteComponent, canActivate: [AuthGuard], resolve: { formulario: ClientResolveService } },
  { path: ':id', component: ClienteViewComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ClienteRoutingModule { }
