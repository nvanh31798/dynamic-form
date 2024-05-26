import { Field } from "./Field";

interface DropdownValueModel {
  id: string;
  label: string;
  
}

export interface DropdownFieldModel extends Field {
  dropdownValues: DropdownValueModel[];
}
