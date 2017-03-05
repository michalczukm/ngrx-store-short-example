import { Component } from '@angular/core';
import { ItemsService } from './items/items.service';
import { ItemsStore, Item } from './common/item.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <app-items-list [items]="items$ | async"></app-items-list>
  </div>
  <div>
    <app-item-detail [item]="item$ | async"></app-item-detail>  
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
}
