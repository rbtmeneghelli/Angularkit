import { Component, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/app_business/service/shared.service';
import { SharedNotificationService } from 'src/app/app_business/service/shared-notification.service';

@Component({
    selector: 'app-card-email',
    templateUrl: './card-email.component.html',
    styleUrls: ['./card-email.component.scss']
})

export class CardEmailComponent {
    onAdd = new EventEmitter<any>();
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    listEmails: any[] = [];
    public formulario: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CardEmailComponent>,
        @Inject(MAT_DIALOG_DATA) public emails: any,
        protected formBuilder: FormBuilder,
        protected sharedService: SharedService,
        protected sharedNotificationService: SharedNotificationService) {
        this.formulario = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
        this.listEmails = emails;
    }

    add() {
        const email: string = this.formulario.get('email').value;
        if (this.formulario.valid) {
            this.listEmails.push(email.trim());
            this.formulario.get('email').setValue('');
        } else {
            this.sharedNotificationService.enviarNotificacao('', 'O email fornecido é invalido, digite um email valido para que ele seja inserido na lista de emails abaixo', 'info');
        }
    }

    remove(email: any): void {
        const index = this.listEmails.indexOf(email);
        if (index >= 0) {
            this.listEmails.splice(index, 1);
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        const email: string = this.formulario.get('email').value;
        if (this.formulario.valid) {
            this.listEmails.push(email.trim());
            this.formulario.get('email').setValue('');
        }
        this.onAdd.emit(this.listEmails);
        this.dialogRef.close();
    }
}
