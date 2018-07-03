import Vue from 'vue';
import ConstrainedField from './field';

export type Constrainable = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

export type ConstraintAttribute<T extends Constrainable> = Extract<keyof T, 'required'
  | 'pattern'
  | 'type'
  | 'step'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'>;

type ha = ConstraintAttribute<HTMLSelectElement>;

export type Constraints<T extends Constrainable> = {
  [key in Extract<ConstraintAttribute<T>, keyof T>]?: T[key] | null;
}

const foobar: Constraints<HTMLSelectElement> = {
  required: true,
  maxLength: 0
}


type bar = keyof Extract<keyof HTMLInputElement, keyof HTMLSelectElement>;

const foo: Extract<ConstraintAttribute, keyof Constrainable> = ''

export type Validities<T extends Constrainable> = {
  [key in keyof Constraints<T>]?: boolean;
};

export interface ConstrainedFields {
  [key: string]: ConstrainedField<Constrainable>
}

export interface SupportsConstrainedFields extends Vue {
  readonly constrainedFields: ConstrainedFields;
  setConstrainedField: <T extends Constrainable>(el: T, constraints?: Constraints<T>) => void;
}
