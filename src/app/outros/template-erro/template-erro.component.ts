import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-erro',
  templateUrl: './template-erro.component.html',
  styleUrls: ['./template-erro.component.css']
})
export class TemplateErroComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  voltar() {
    this.route.navigate(['/']);
  }
}
