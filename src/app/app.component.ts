import { Component } from '@angular/core';
import { AuthService } from './guards/auth.guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Templates';

  constructor(private authService: AuthService) { }

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
