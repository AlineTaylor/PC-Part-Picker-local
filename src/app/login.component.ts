import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <section class="login-section">
      <button (click)="signIn()">Sign in with Google</button>
    </section>
  `,
  styleUrls: ['./login.component.css'] // optional
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  signIn() {
    this.auth.signInWithGoogle().catch(console.error);
  }
}
