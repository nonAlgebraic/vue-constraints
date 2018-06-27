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

export type Constraints = {
  [key in keyof ConstraintAttributes]?: ConstraintAttributes[key] | null
};

export interface ConstrainedFieldInterface {
  el: HTMLInputElement;
  constraints: Constraints;
  validities: Validities;
}

export interface ConstrainedFields {
  [key: string]: ConstrainedFieldInterface;
}

export interface ComponentWithConstrainedFields extends Vue {
  constrainedFields: ConstrainedFields;
  bindConstrainedField: (
    name: string,
    el: HTMLInputElement,
    config: Constraints
  ) => void;
  updateConstrainedField: (name: string, config: Constraints) => void;
  unbindConstrainedField: (name: string) => void;
}

export type Validators = {
  [key in keyof ConstraintAttributes]: keyof ValidityState
};

export type Validities = { [key in keyof Constraints]: boolean };
