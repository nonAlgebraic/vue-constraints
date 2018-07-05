import Vue from 'vue';
import ConstrainedField from './field';

export type Constrainable =
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLInputElement;

type ConstraintAttribute<T extends Constrainable> =
  | 'required'
  | Extract<
      keyof T,
      'pattern' | 'type' | 'step' | 'min' | 'max' | 'minLength' | 'maxLength'
    >;

export type ConstraintValue<
  T extends Constrainable,
  V extends ConstraintAttribute<T>
> = T[V] | { }

export type Constraints<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?: ConstraintValue<
    T,
    ConstraintAttribute<T>
  > | null
};

export type Validities<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?: boolean
};

export type Validators = {
  [key in
    | ConstraintAttribute<HTMLSelectElement>
    | ConstraintAttribute<HTMLTextAreaElement>
    | ConstraintAttribute<HTMLInputElement>]: keyof ValidityState
};

export interface ConstrainedFields {
  [key: string]: ConstrainedField<Constrainable>;
}

export interface ComponentWithConstrainedFields extends Vue {
  readonly constrainedFields: ConstrainedFields;
  setConstrainedField: <T extends Constrainable>(
    el: T,
    constraints?: Constraints<T>
  ) => void;
}
