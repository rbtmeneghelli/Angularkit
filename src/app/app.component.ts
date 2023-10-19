import { Component, OnInit } from '@angular/core';
import { AuthService } from './guards/auth.guard.service';
import { MenuDTO } from './app_entities/dto/menu.dto';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public title: string;
  public listaMenu: Array<MenuDTO> = new Array<MenuDTO>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.title = 'Templates';
    this.listaMenu.push({ link: 'agenda', icon: 'play_arrow', description: 'Agenda' });
    this.listaMenu.push({ link: 'auditoria', icon: 'play_arrow', description: 'Auditoria' });
    this.listaMenu.push({ link: 'banco', icon: 'play_arrow', description: 'Banco' });
    this.listaMenu.push({ link: 'cliente', icon: 'play_arrow', description: 'Cliente' });
    this.listaMenu.push({ link: 'conta', icon: 'play_arrow', description: 'Conta' });
    this.listaMenu.push({ link: 'empresa', icon: 'play_arrow', description: 'Empresa' });
    this.listaMenu.push({ link: 'funcionalidade', icon: 'play_arrow', description: 'Funcionalidade' });
    this.listaMenu.push({ link: 'lista', icon: 'play_arrow', description: 'Lista' });
    this.listaMenu.push({ link: 'perfil', icon: 'play_arrow', description: 'Perfil' });
    this.listaMenu.push({ link: 'relatorio', icon: 'play_arrow', description: 'Relatório' });
    this.listaMenu.push({ link: 'servico', icon: 'play_arrow', description: 'Serviço' });
    this.listaMenu.push({ link: 'config', icon: 'play_arrow', description: 'Configuração Sistema' });

    this.createOnline().subscribe((isOnline: any) => {
      if (isOnline === false) {
        alert("Não foi possível prosseguir, por favor, verifique sua conexão à internet.");
      }
    });
  }

  Logout() {
    this.authService.logout();
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  createOnline() {
    return merge(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}


// async ngOnInit(): Promise<void> {
//   await this.formularioService.getUser().pipe(take(1)).toPromise().then(response => {
//     this.generalService.setUserNameValue(response['user-profile']?.displayName);
//   }).catch(error => {
//   });
//   this.title = 'product-supply-data-pipeline-form';
//   setInterval(async () => await this.checkConnection(), 5000);
// }

// async checkConnection(): Promise<void> {
//   fetch('/').then(response => {
//     this.generalService.setConnectionStatusNetwork(true);
//   }).catch(error => {
//     this.generalService.setConnectionStatusNetwork(false);
//   });
// }