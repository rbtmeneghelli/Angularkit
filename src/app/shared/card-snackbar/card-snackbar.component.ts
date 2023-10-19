import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-card-snackbar',
    templateUrl: './card-snackbar.component.html'
})

export class CardSnackBarComponent implements OnInit {

    public titleMessage: string;
    public message: string;

    constructor(
        public dialogRef: MatDialogRef<CardSnackBarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.titleMessage = this.data?.titleMessage; 
        this.message = this.data?.message;
    }

    async closeModal(): Promise<void> {
        this.dialogRef.close();
    }
}