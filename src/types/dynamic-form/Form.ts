import { Field } from "./Field"
import { SectionType } from "./SectionType"

export interface FormModel {
    id: number
    title: string
    description: string
    createdDate: string
    fee: string
    sections: SectionModel[]
  }
  
  export interface SectionModel {
    id: string
    type: SectionType;
    showReceipt?: boolean;
    steps?: StepModel[]
  }
  
  export interface StepModel {
    id: string
    label: string
    fields: Field[]
    title?: string
  }
  
