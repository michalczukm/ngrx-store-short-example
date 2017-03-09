import { Component } from '@angular/core';
import { ItemsService } from './items/items.service';
import { ItemsStore, Item } from './common/item.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SelectedItemAction } from './common/selected-item.store';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <app-items-list [items]="items$ | async" 
        (selected)="selectItem($event)" 
        (deleted)="deleteItem($event)"></app-items-list>
  </div>
  <div>
    <app-item-detail [item]="item$ | async"
        (canceled)="resetItem()"
        (saved)="saveItem($event)">      
  </app-item-detail>  
  </div>
  `
})
export class AppComponent {
  items$: Observable<Item[]>;
  item$: Observable<Item>;

  constructor(private itemsService: ItemsService, private store: Store<ItemsStore>) {
    this.items$ = this.itemsService.items;
    this.item$ = this.store.select('selectedItem');

    this.itemsService.loadItems();
  }

  selectItem(item: Item) {
      this.store.dispatch(new SelectedItemAction(item));
  }

  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);
  }

  resetItem() {
    this.store.dispatch(new SelectedItemAction( {} as Item));
  }

  saveItem(item: Item) {
    if (item.id) {
      this.itemsService.updateItem(item);
    } else {
      this.itemsService.createItem(item);
    }

    this.resetItem();
  }
}
