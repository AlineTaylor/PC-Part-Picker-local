import { Component, inject, Input, computed, signal } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { PartService } from '../../services/part.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item-card',
  imports: [SharedModule],
  standalone: true,
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css',
})
export class ItemCardComponent {
  private partService = inject(PartService);

  @Input() type: 'favorites' | 'recently-viewed' | 'results' = 'favorites';

  items = computed(() => {
    const result =
      this.type === 'results'
        ? this.partService.filteredResults()
        : this.type === 'favorites'
        ? this.partService.favoriteItems()
        : this.partService.recentlyViewedItems();
    return result;
  });

  toggleFavorite(item: Item) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
    alert('⚠️ Please sign in to favorite items.');
    return;
  }

    this.partService.toggleFavorite(item);
    this.partService.addToRecentlyViewed(item);
  }

  isFavorited(item: Item): boolean {
    return this.partService.isFavorited(item);
  }

  onAmazonClick(item: Item) {
    this.partService.addToRecentlyViewed(item);
  }
}
