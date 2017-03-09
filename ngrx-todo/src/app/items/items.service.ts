import { Injectable } from '@angular/core';
import { ItemsStore, Item } from '../common/item.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddItemsAction, getItems, DeleteItemAction, CreateItemAction, UpdateItemAction } from '../common/items.store';
import { Headers, Http } from '@angular/http';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

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

  deleteItem(item: Item) {
    this.store.dispatch(new DeleteItemAction(item));
  }

  createItem(item: Item) {
    this.store.dispatch(new CreateItemAction(item));
  }

  updateItem(item: Item) {
    this.store.dispatch(new UpdateItemAction(item));
  }
}
