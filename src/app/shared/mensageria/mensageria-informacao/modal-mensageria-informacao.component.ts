import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal-mensageria-informacao',
    templateUrl: './modal-mensageria-informacao.component.html'
})
export class ModalMensageriaInformacaoComponent implements OnInit {
    @Input() dados: any;
    @Input() closeModal: any;

    ngOnInit(): void { }
}
