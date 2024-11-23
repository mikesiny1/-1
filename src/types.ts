export interface Item {
  id: string;
  name: string;
  checked: boolean;
}

export interface Category {
  id: string;
  name: string;
  defaultItems: string[];
}