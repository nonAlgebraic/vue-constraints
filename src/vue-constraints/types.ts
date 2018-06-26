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

export interface ConstraintAttributes extends Pick<HTMLInputElement, ConstraintTypes> {
  required: 'required' | true;
  type: HTMLInputElementType;
}

export type ConstraintsConfig = {
  [key in keyof ConstraintAttributes]?: ConstraintAttributes[key] | null;
}

export type Validities = {
  [key in keyof ConstraintsConfig]: boolean
};

export interface ConstrainedField {
  el: HTMLInputElement;
  validities: Validities
}

export type ConstrainedFields = {
  [key: string]: ConstrainedField;
}

export interface ComponentWithConstrainedFields extends Vue {
  $constrainedFields: ConstrainedFields;
  bindConstrainedField: (
    name: string,
    el: HTMLInputElement,
    config: ConstraintsConfig
  ) => void;
  updateConstrainedField: (name: string, config: ConstraintsConfig) => void;
  unbindConstrainedField: (name: string) => void;
}

export type Validators = {
  [key in keyof ConstraintAttributes]: (el: HTMLInputElement) => boolean;
}
