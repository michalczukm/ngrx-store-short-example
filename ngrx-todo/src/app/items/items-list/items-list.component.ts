import { Component, Input, Output, EventEmitter } from '@angular/core';
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
          <button (click)="select(item)">Details</button>
          <button (click)="delete(item)">Delete</button>
        </p>
      </li>
    </ul>`
})
export class ItemsListComponent {
  @Input() items: Item[];
  @Output() selected = new EventEmitter<Item>();
  @Output() deleted = new EventEmitter<Item>();

  constructor(private store: Store<ItemsStore>) {
  }

  select(item: Item) {
    this.selected.emit(item);
  }

  delete(item: Item) {
    this.deleted.emit(item);
  }
}
