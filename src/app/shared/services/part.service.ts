import { Injectable, signal, computed } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from './item.service';
import { persistentSignal } from '../persistent-signal';

@Injectable({ providedIn: 'root' })
export class PartService {
  private favoritesSignal = persistentSignal<Item[]>('favorites', []);

  private recentlyViewedSignal = persistentSignal<Item[]>('recentlyViewed', []);

  private filterField = signal<'name' | 'manufacturer' | 'type'>('name');

  private selectedType = signal<string>('');

  readonly favoriteItems = this.favoritesSignal.asReadonly();

  readonly recentlyViewedItems = this.recentlyViewedSignal.asReadonly();

  readonly filteredResults = computed(() => {
    const type = this.selectedType().toLowerCase();
    return this.itemService
      .items()
      .filter((item) => (type ? item.type.toLowerCase() === type : true));
  });

  constructor(private itemService: ItemService) {}

  setType(type: string) {
    this.selectedType.set(type);
  }

  setFilterField(field: 'name' | 'manufacturer' | 'type') {
    this.filterField.set(field);
  }

  toggleFavorite(item: Item) {
    const current = this.favoritesSignal();
    const exists = current.some((fav) => fav.name === item.name);

    this.favoritesSignal.set(
      exists
        ? current.filter((fav) => fav.name !== item.name)
        : [...current, item]
    );
  }

  isFavorited(item: Item): boolean {
    return this.favoritesSignal().some((fav) => fav.name === item.name);
  }

  addToRecentlyViewed(item: Item) {
    const current = this.recentlyViewedSignal().filter(
      (i) => i.key !== item.key
    );
    this.recentlyViewedSignal.set([item, ...current].slice(0, 10));
  }
}
