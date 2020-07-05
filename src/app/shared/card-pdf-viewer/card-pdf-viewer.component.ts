import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-pdf-viewer',
  templateUrl: './card-pdf-viewer.component.html',
  styleUrls: ['./card-pdf-viewer.component.css']
})
export class CardPdfViewerComponent implements OnInit {

  public pdfSrc: string;

  constructor(private route: Router, public dialogRef: MatDialogRef<CardPdfViewerComponent>) { }

  ngOnInit() {
    this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  }

  fechar() {
    this.dialogRef.close();
  }

  voltarHome() {
    this.route.navigate(['/']);
  }
}

