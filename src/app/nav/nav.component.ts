import { MenuDTO } from './../app_entities/dto/menu.dto';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../guards/auth.guard.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

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
        this.listaMenu.push({ link: 'perfil', icon: 'play_arrow', description: 'Perfil' });
        this.listaMenu.push({ link: 'relatorio', icon: 'play_arrow', description: 'Relatório' });
        this.listaMenu.push({ link: 'servico', icon: 'play_arrow', description: 'Serviço' });
        this.listaMenu.push({ link: 'config', icon: 'play_arrow', description: 'Configuração Sistema' });
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
}
