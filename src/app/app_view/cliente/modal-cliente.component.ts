import { ClienteService } from '../../app_business/service/cliente.service';
import { Cliente } from '../../app_entities/model/cliente.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../app_business/service/shared.service';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';

@Component({
    selector: 'app-modal-cliente',
    templateUrl: './modal-cliente.component.html'
})
export class ModalClienteComponent implements OnInit {
    public message: string;
    public errorMessage: string;
    @Input() dados: Cliente;
    @Input() closeModal: any;
    @Output() statusModal: EventEmitter<boolean> = new EventEmitter();
    constructor(
        private sharedNotificationService: SharedNotificationService,
        private clienteService: ClienteService
    ) { }

    ngOnInit() {
    }

    excluir() {
        this.message = 'Cliente excluido com sucesso';
        this.errorMessage = 'Falha ao excluir o Cliente';
        this.subscribeToSaveResponse(this.clienteService.deleteById(this.dados.id));
    }

    subscribeToSaveResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((response: any) => this.closeModal(this.onSaveSuccess()), () => this.closeModal(this.onSaveError()));
    }

    onSaveSuccess() {
        this.sendStatusModal(true);
        this.sharedNotificationService.enviarNotificacaoToRoute('', this.message, 'success', 'cliente');
    }

    onSaveError() {
        this.sendStatusModal(false);
        this.sharedNotificationService.enviarNotificacao('', this.errorMessage, 'error');
    }

    sendStatusModal(status: boolean) {
        this.statusModal.emit(status);
    }
}
