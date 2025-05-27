import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { LoginComponent } from '../../../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from '../../../search/search.component';
import { ComponentType } from '@angular/cdk/overlay';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service'; // ✅ Add this line

@Component({
  selector: 'app-header',
  imports: [SharedModule, RouterModule, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  readonly authService = inject(AuthService); // ✅ Add this line
  // adds log-out popup
  constructor(private snackBar: MatSnackBar) {}
  LoginComponent = LoginComponent;
  SearchComponent = SearchComponent;

  openDialog(component: ComponentType<any>) {
    this.dialog.open(component);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle().catch(console.error);
  }
  

 logout() {
  this.authService.logout()
    .then(() => {
      this.snackBar.open('You have been logged out.', 'Close', {
        duration: 3000,
      });
    })
    .catch((error) => {
      console.error('Logout failed:', error);
    });
}
}
