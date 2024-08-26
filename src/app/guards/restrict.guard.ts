import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})

export class RestrictGuard implements CanActivate {
  
  private readonly ADMIN_ID: number = 1;

  constructor(private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    {
      if (!!route?.params?.id) {
        if (Number(route?.params?.id) === this.ADMIN_ID) {
          this.returnToPrincipalPage(state.url);
          return false;
        } else {
          return true;
        }
      }
    }
  }

  private returnToPrincipalPage(url: string): void {
    const principalPath = url.split('/').filter((p) => p !== '');
    this._router.navigate([`/${principalPath[0]}/${principalPath[1]}`]);
  }
}
