import { Item, ItemsStore } from './item.model';
import { Action } from '@ngrx/store';

// actions
export class AddItemsAction implements Action {
  type = 'ADD_ITEMS';
  // static get type(): string { return this.type }

  constructor(public payload: Item[]) {
  }
}

export class CreateItemAction implements Action {
  type = 'CREATE_ITEM';

  constructor(public payload: Item) {
  }
}

export class UpdateItemAction implements Action {
  type = 'UPDATE_ITEM';

  constructor(public payload: Item) {
  }
}

export class DeleteItemAction implements Action {
  type = 'DELETE_ITEM';

  constructor(public payload: Item) {
  }
}

export type Actions = AddItemsAction
  | CreateItemAction
  | UpdateItemAction
  | DeleteItemAction;

// reducer
export const items = (state: Item[] = [], action: Actions | {type, payload}): Item[] => {
  switch (action.type) {
    case 'ADD_ITEMS':
      return action.payload;
    case 'CREATE_ITEM':
      return [...state, action.payload];
    case 'UPDATE_ITEM':
      return state.map(
        item => item.id === action.payload.id
          ? Object.assign({}, item, action.payload)
          : item
      );
    case 'DELETE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const getItems = (store: ItemsStore) => store.items;
