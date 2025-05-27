import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PartService } from '../shared/services/part.service';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { EmailSharingComponent } from '../email-sharing/email-sharing.component';
import { ItemCardComponent } from '../shared/layout/item-card/item-card.component';
@Component({
  selector: 'app-results',
  imports: [SharedModule, ItemCardComponent],
  standalone: true,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  //result filtering
  private searchService = inject(PartService);
  results = this.searchService.filteredResults;

  updateSearch(type: string) {
    this.searchService.setType(type);
  }

  filterByType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.searchService.setType(value);
  }
  //emailing sharing
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
