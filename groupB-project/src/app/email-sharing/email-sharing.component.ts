import { Component, computed, inject, Input } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartService } from '../shared/services/part.service';
import { ShareService } from '../shared/services/share.service';

@Component({
  selector: 'app-email-sharing',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './email-sharing.component.html',
  styleUrl: './email-sharing.component.css',
})
export class EmailSharingComponent {
  private partService = inject(PartService);
  public shareService = inject(ShareService);
  public dialogRef = inject(MatDialogRef<EmailSharingComponent>);

  constructor() {
    const dialogData = inject(MAT_DIALOG_DATA, { optional: true });
    if (dialogData && dialogData.type) {
      this.type = dialogData.type;
    }
  }

  // Use the tag to decide which data to pull
  @Input()
  type: 'favorites' | 'recently-viewed' | 'results' = 'favorites';

  // Dynamically choose the data based on the type
  items = computed(() => {
    const result =
      this.type === 'results'
        ? this.partService.filteredResults()
        : this.type === 'favorites'
        ? this.partService.favoriteItems()
        : this.partService.recentlyViewedItems();
    return result;
  });

  toggleForm() {
    this.shareService.toggleShareForm();
  }

  emailMessage() {
    this.shareService.logSharedItems(this.items());
    this.shareService.resetShareForm();
    this.dialogRef.close();
  }
}
