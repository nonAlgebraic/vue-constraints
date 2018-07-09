import Vue from 'vue';
import ConstrainedField from './field';

export type Diff<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? Diff<T[P]> | undefined
    : T[P] | undefined
};

export type Constrainable =
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLInputElement;

export type ConstraintAttribute<T extends Constrainable> =
  | 'required'
  | Extract<
      keyof T,
      'pattern' | 'type' | 'step' | 'min' | 'max' | 'minLength' | 'maxLength'
    >;

export type Constraint<
  T extends Constrainable,
  V extends ConstraintAttribute<T>
> = T[V];

export interface ConstraintsConfigObject<
  T extends Constrainable,
  V extends ConstraintAttribute<T>
> {
  constraint: Constraint<T, V>;
  errorMessage?: string;
}

export type Constraints<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?: Constraint<T, key>
}

export type ErrorMessages<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?: string
};

export type ConstraintsConfig<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?:
    | ConstraintsConfigObject<T, key>
    | Constraint<T, key>
};

export interface Config<T extends Constrainable> {
  constraints: Constraints<T>;
  errorMessages: ErrorMessages<T>;
}

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
    config?: Config<T>
  ) => void;
}
