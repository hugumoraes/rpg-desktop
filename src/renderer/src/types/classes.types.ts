import { ClassAttributes } from './class-attributes.types';

export interface Class {
  class_id: number;
  name: string;
  class_attributes?: ClassAttributes[];
}
