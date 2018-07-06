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

export type Constraint<T extends Constrainable, V extends ConstraintAttribute<T>> = T[V];

export interface ConfigObject<
  T extends Constrainable,
  V extends ConstraintAttribute<T>
> {
  constraint: Constraint<T, V>
  errorMessage?: string;
}

type NullableConfigObject<T extends Constrainable, V extends ConstraintAttribute<T>> = {
  [key in keyof ConfigObject<T, V>]: ConfigObject<T, V>[key] | null;
}

export type Config<T extends Constrainable> = {
  [key in keyof NormalizedConfig<T>]?: NormalizedConfig<T>[key] | Constraint<T, key>;
};

export type NormalizedConfig<T extends Constrainable> = {
  [key in ConstraintAttribute<T>]?: ConfigObject<T, key>;
}

export type NullableConfig<T extends Constrainable> = {
  [key in keyof NormalizedConfig<T>]?: NullableConfigObject<T, key> | null;
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
    config?: NormalizedConfig<T>
  ) => void;
}
