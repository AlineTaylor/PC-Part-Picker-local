import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [SharedModule],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
