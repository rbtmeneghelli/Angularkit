import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SharedNotificationService {

    // tslint:disable-next-line: max-line-length
    constructor(
        protected route: Router,
        protected snackBar: MatSnackBar
    ) {
    }

    public enviarNotificacao(titulo: string, texto: string, tipo: any) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            confirmButtonText: 'Ok'
        });
    }

    public enviarNotificaçãoConfirmar(titulo: string, texto: string, tipo: any, objeto: any) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.value) {
                this.enviarNotificacao('', '', 'success');
            }
        });
    }

    public enviarNotificaçãoConfirmarVoltar(titulo: string, texto: string, tipo: any, objeto: any, rota: string) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#c3c3c3',
            cancelButtonColor: '#c3c3c3',
            confirmButtonText: 'Confirmar'
        })
            .then(result => {
                if (result.value) {
                    this.route.navigate([`/${rota}`]);
                }
            })
            .catch(err => { });
    }

    public enviarNotificacaoToRoute(titulo: string, texto: string, tipo: any, rota: string) {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: tipo,
            confirmButtonColor: '#c3c3c3',
            confirmButtonText: 'OK'
        })
            .then(result => {
                if (result.value) {
                    this.route.navigate([`${rota}`]);
                }
            })
            .catch(err => { });
    }

    public enviarNotificacaoSnackBar(message?: string, isError?: boolean) {
        this.snackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: isError ? ['msg-error'] : ['msg-success']
        });
    }
}
