import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';
import { Item } from '../../common/item.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-detail',
  template: `
    <div>
      <h2 *ngIf="selectedItem.id">Editing {{originalName}}</h2>
      <h2 *ngIf="!selectedItem.id">Create new</h2>
    </div>
    <div>
      <form novalidate>
        <div>
          <label>Item name</label>
          <input [(ngModel)]="selectedItem.name" name="name" placeholder="Enter name" type="text"/>
        </div>
      </form>
    </div>
    <div>
      <button type="button" (click)="cancel()">Cancel</button>
      <button type="submit" (click)="save()">Save</button>
    </div>
  `,
})
export class ItemDetailComponent implements OnChanges {
  @Input() item;
  @Output() saved = new EventEmitter<Item>();
  @Output() canceled = new EventEmitter();

  selectedItem: Item;
  originalName: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const item = changes['item'].currentValue as Item;
    if (item) {
      this.originalName = item.name;
    }
    this.selectedItem = Object.assign({}, item);
  }

  save() {
    this.saved.emit(Object.assign({}, this.selectedItem));
  }

  cancel() {
    this.canceled.emit();
  }
}
