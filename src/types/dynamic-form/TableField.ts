import { Field } from "./Field";

export interface TableHeaderModel {
  label: string;
  key: string;
}

export interface TableFieldModel extends Field {
  headers: TableHeaderModel[];
  dataUrl?: string;
  model?: string;
  searchable?: boolean;
  searchField?: string;
  addable?: boolean;
  addNewFormId?: number;
}
