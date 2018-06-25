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
  | 'maxLength'

export interface ConstraintAttributes
  extends Pick<HTMLInputElement, ConstraintTypes> {
  required: 'required' | true;
  type: HTMLInputElementType;
}

// type Constraints = {
//   [key in keyof ConstraintAttributes]: ConstraintAttributes[key];
// }

export type ConstraintOptions = {
  [key in keyof ConstraintAttributes]?: ConstraintAttributes[key];
}

export type ConstraintsDiff = {
  [key in keyof ConstraintAttributes]?: ConstraintAttributes[key] | null;
}

// export interface Constraints extends Partial<ConstraintAttributes> {
//   [key in ConstraintAttributes]:
//     | ConstraintAttributes[keyof ConstraintAttributes]
//     | undefined;
// }

export interface ConstrainedField {
  el: HTMLInputElement;
  constraints: { [key in ConstraintTypes]: boolean };
}

export interface ConstrainedFields {
  [key: string]: ConstrainedField;
}

export interface ComponentWithConstrainedFields extends Vue {
  $constrainedFields: ConstrainedFields;
  bindConstrainedField: (name: string, el: HTMLInputElement, constraints: Constraints) => void;
  updateConstrainedField: (name: string, constraints: Constraints) => void;
  unbindConstrainedField: (name: string) => void;
}
