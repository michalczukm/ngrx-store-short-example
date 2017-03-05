import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../common/item.model';

@Component({
  selector: 'app-item-detail',
  template: `
    <p>Item details</p>
    <p>{{item.id}}: {{item.name}}</p>
  `,
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
