import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedVariables } from 'src/app/app_entities/shared/shared-variables';

export class Mensageria {
  nome: string;
  orgao: string;
  data: Date;
  mensagem: string;
}

@Component({
  selector: 'app-mensageria',
  templateUrl: './mensageria.component.html'
})

export class MensageriaComponent implements OnInit {
  public listaMensagem: Array<Mensageria> = new Array<Mensageria>();
  public formulario: FormGroup;
  public account: any;
  public currentDate: Date = SharedVariables.CURRENT_DATE;
  public dados: any;
  public closeResult: string;

  constructor(
    private readonly formBuilder: FormBuilder, 
    private readonly route: Router, 
    private readonly modalService: NgbModal
  ) {
    this.formulario = formBuilder.group({
      MENSAGEM: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.buildListaMensagens();
  }

  buildListaMensagens() {
    for (let i = 0; i <= 3; i++) {
      const mensageria = new Mensageria();
      mensageria.nome = 'teste' + i;
      mensageria.orgao = i % 2 === 0 ? 'XPTO' : 'YXZ';
      mensageria.data = SharedVariables.CURRENT_DATE;
      mensageria.mensagem = i % 2 === 0 ? 'OLA MUNDO ' + i : 'TCHAU' + i;
      this.listaMensagem.push(mensageria);
    }
  }

  sendMessage() {
    Swal.fire({
      title: '',
      text: 'Deseja confirmar o envio dessa mensagem',
      type: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#c3c3c3',
      cancelButtonColor: '#c3c3c3',
      confirmButtonText: 'Confirmar'
    })
      .then(result => {
        if (result.value) {
          // TODO: Chamar a rotina que vai enviar o email e atualizar a lista de mensagens.
          this.formulario.reset();
        }
      })
      .catch(err => {});
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
