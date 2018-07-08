import Vue from 'vue';
import ConstrainedField from './field';

export type Diff<T extends object> = {
  [P in keyof T]: T[P] extends object ? Diff<T[P]> | undefined : T[P] | undefined;
}

type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]

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

export type Constraint<T extends Constrainable, V extends ConstraintAttribute<T>> = T[V];

export interface DirectiveConfigObject<
  T extends Constrainable,
  V extends ConstraintAttribute<T>
> {
  constraint: Constraint<T, V>
  errorMessage: string;
}

export type Constraints<T extends Constrainable> = AtLeastOne<{
  [key in ConstraintAttribute<T>]: Constraint<T, key>
}>

export type ErrorMessages<T extends Constrainable> = AtLeastOne<{
  [key in ConstraintAttribute<T>]: string;
}>

export type DirectiveConfig<T extends Constrainable> = AtLeastOne<{
  [key in ConstraintAttribute<T>]?: DirectiveConfigObject<T, key> | Constraint<T, key>;
}>;

export interface Config<T extends Constrainable> {
  constraints: Constraints<T>;
  errorMessages?: ErrorMessages<T>;
}

export type Validities<T extends Constrainable> = AtLeastOne<{
  [key in ConstraintAttribute<T>]?: boolean
}>;

export type Validators = {
  [key in
    | ConstraintAttribute<HTMLSelectElement>
    | ConstraintAttribute<HTMLTextAreaElement>
    | ConstraintAttribute<HTMLInputElement>]: keyof ValidityState
};

export type ConstrainedFields = AtLeastOne<{
  [key: string]: ConstrainedField<Constrainable>;
}>;

export interface ComponentWithConstrainedFields extends Vue {
  readonly constrainedFields: ConstrainedFields;
  setConstrainedField: <T extends Constrainable>(
    el: T,
    config?: Config<T>
  ) => void;
}
