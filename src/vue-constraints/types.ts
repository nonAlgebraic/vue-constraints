import Vue from 'vue';

type HTMLInputElementType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

type ConstraintTypes =
  | 'pattern'
  | 'min'
  | 'max'
  | 'step'
  | 'minLength'
  | 'maxLength';

interface ConstraintAttributes extends Pick<HTMLInputElement, ConstraintTypes> {
  required: 'required' | true;
  type: HTMLInputElementType;
}

export type ConstraintsConfig = {
  [key in keyof ConstraintAttributes]?: ConstraintAttributes[key] | null;
}

export type ValiditiesInterface = {
  [key in keyof ConstraintAttributes]: boolean;
}

export interface ConstrainedFieldInterface {
  el: HTMLInputElement;
  constraints: ConstraintsConfig;
  validities: ValiditiesInterface
}

export interface ConstrainedFields {
  [key: string]: ConstrainedFieldInterface;
}

export interface ComponentWithConstrainedFields extends Vue {
  constrainedFields: ConstrainedFieldInterface;
  bindConstrainedField: (
    name: string,
    el: HTMLInputElement,
    config: ConstraintsConfig
  ) => void;
  updateConstrainedField: (name: string, config: ConstraintsConfig) => void;
  unbindConstrainedField: (name: string) => void;
}

export type Validators = {
  [key in keyof ConstraintAttributes]: keyof ValidityState;
}
