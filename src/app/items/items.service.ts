import { Injectable } from '@angular/core';
import { ItemsStore, Item } from '../common/item.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddItemsAction, getItems } from '../common/items.store';

@Injectable()
export class ItemsService {
  items: Observable<Item[]>;

  constructor(private store: Store<ItemsStore>) {
    this.items = this.store.select(getItems);
  }

  loadItems() {
    const items = [{id: 1, name: 'Foo'}, {id: 2, name: 'Bar'}] as Item[];

    this.store.dispatch(new AddItemsAction(items));
  }
}
