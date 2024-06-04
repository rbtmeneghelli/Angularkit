import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.guard.service';
import { CredenciaisDTO } from '../app_entities/dto/credencial.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  hideSenha: boolean;
  loading: boolean;
  labelSistema: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      senha: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
    this.hideSenha = true;
    this.loading = false;
    this.labelSistema = '';
  }

  doLogin() {
    const credencial: CredenciaisDTO = new CredenciaisDTO();
    credencial.login = this.formulario.controls.usuario.value;
    credencial.senha = this.formulario.controls.senha.value;
    this.authService.doLogin(credencial).pipe(take(1)).subscribe(response => {
      this.authService.keepUserData(response);
      this.router.navigate(['/dashboard']);
    });
  }
}
