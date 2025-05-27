import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { LoginComponent } from '../../../login/login.component';
import { SearchComponent } from '../../../search/search.component';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service'; // ✅ Add this line

@Component({
  selector: 'app-navbar',
  imports: [SharedModule, RouterModule, RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);
  readonly authService = inject(AuthService); // ✅ Add this line

  LoginComponent = LoginComponent;
  SearchComponent = SearchComponent;

  openDialog(component: ComponentType<any>) {
    this.dialog.open(component);
  }

  signIn() {
    this.authService.signInWithGoogle().catch(console.error); // ✅ Add this method
  }
}
