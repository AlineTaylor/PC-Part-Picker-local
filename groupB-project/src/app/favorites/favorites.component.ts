import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemCardComponent } from '../shared/layout/item-card/item-card.component';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';
import { EmailSharingComponent } from '../email-sharing/email-sharing.component';

@Component({
  selector: 'app-favorites',
  imports: [SharedModule, ItemCardComponent],
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  readonly dialog = inject(MatDialog);
  emailSharingComponent = EmailSharingComponent;
  openDialog(
    component: ComponentType<any>,
    type: 'favorites' | 'recently-viewed' | 'results'
  ) {
    this.dialog.open(component, {
      data: { type },
    });
  }
}
