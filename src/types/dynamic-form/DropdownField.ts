import { Field } from "./Field";

interface DropdownValueModel {
  id: number;
  label: string;
}

export interface DropdownFieldModel extends Field {
  dropdownValues: DropdownValueModel[];
}
