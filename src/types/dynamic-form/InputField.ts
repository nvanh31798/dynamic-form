import { Field } from "./Field";

export interface InputFieldModel extends Field {
    placeholder?: string;
    prefilled?: string;
}
