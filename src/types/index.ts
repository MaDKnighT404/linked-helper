export interface Element {
  text: string;
  id: string;
  deepLevel: number;
  count: number;
  status: string;
}

export type NestedElement = Element | NestedElement[];
