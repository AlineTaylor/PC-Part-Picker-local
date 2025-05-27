import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemCardComponent } from '../shared/layout/item-card/item-card.component';
import { EmailSharingComponent } from '../email-sharing/email-sharing.component';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recently-viewed',
  imports: [SharedModule, ItemCardComponent],
  standalone: true,
  templateUrl: './recently-viewed.component.html',
  styleUrl: './recently-viewed.component.css',
})
export class RecentlyViewedComponent {
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
