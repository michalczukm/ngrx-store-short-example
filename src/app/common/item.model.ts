export type Item = {
  id;
  name
};

export interface ItemsStore {
  items: Item[];
  selectedItem: Item;
}
