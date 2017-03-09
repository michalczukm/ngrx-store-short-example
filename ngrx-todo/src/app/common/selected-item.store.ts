import { Item } from './item.model';
import { Action } from '@ngrx/store';

// actions
export class SelectedItemAction implements Action {
  type = 'SELECTED_ITEM';

  constructor(public payload: Item) {
  }
}

export type Actions = SelectedItemAction;

// reducer
export const selectedItem = (state: Item = {} as Item, action: Actions): Item => {
  switch (action.type) {
    case 'SELECTED_ITEM':
      return action.payload;
    default:
      return state;
  }
};
