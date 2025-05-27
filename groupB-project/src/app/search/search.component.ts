import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { PartService } from '../shared/services/part.service';

@Component({
  selector: 'app-search',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private searchService = inject(PartService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<SearchComponent>);

  results = this.searchService.filteredResults;

  updateSearch(type: string) {
    this.searchService.setType(type);
  }

  changeFilter(field: 'name' | 'manufacturer' | 'type') {
    this.searchService.setFilterField(field);
  }

  filterByType(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.searchService.setType(value);
  }

  goToResults() {
    this.dialogRef.close();
    this.router.navigate(['/results']);
  }
}
