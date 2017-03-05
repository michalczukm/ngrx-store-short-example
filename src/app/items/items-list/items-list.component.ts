import { Component, Input } from '@angular/core';
import { Item, ItemsStore } from '../../common/item.model';
import { Store } from '@ngrx/store';
import { SelectedItemAction } from '../../common/selected-item.store';

@Component({
  selector: 'app-items-list',
  template: `
    <ul>
      <li *ngFor="let item of items">
        <p>
          {{item.id}}: {{item.name}}
          <button (click)="openDetails(item)">Details</button>
        </p>
      </li>
    </ul>`
})
export class ItemsListComponent {
  @Input() items: Item[];

  constructor(private store: Store<ItemsStore>) {
  }

  openDetails(item: Item) {
    this.store.dispatch(new SelectedItemAction(item));
  }
}
