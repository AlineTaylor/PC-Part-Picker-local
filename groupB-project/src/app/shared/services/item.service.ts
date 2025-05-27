import { Injectable, signal } from '@angular/core';
import { Item } from '../../models/item.model';
import { Database, ref, onValue } from '@angular/fire/database';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private itemsSignal = signal<(Item & { key: string })[]>([]);

  readonly items = this.itemsSignal.asReadonly();

  constructor(private db: Database) {
    const dbRef = ref(this.db, 'items');
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val() || {};
      const items = Object.entries(data).map(([key, value]: [string, any]) => ({
        ...value,
        key, // rename for consistency
      }));
      this.itemsSignal.set(items);
    });
  }
}
