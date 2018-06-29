export type Constrainable = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

type SelectConstraints = Partial<Pick<HTMLSelectElement, 'required'>>;

type TextAreaConstraints = Partial<Pick<HTMLTextAreaElement, keyof SelectConstraints
  | 'minLength'
  | 'maxLength'>>;

type InputConstraints = Partial<Pick<HTMLInputElement, keyof TextAreaConstraints
  | 'pattern'
  | 'min'
  | 'max'
  | 'step'
  | 'type'>>;

export type Constraints<T> =
  T extends HTMLInputElement ? InputConstraints :
  T extends HTMLTextAreaElement ? TextAreaConstraints :
  T extends HTMLSelectElement ? SelectConstraints : never;


export interface ConstrainedFieldInterface<T extends Constrainable> {
  el: T;
  constraints: Constraints<T>
  validities: Validities<T>;
}
export interface ConstrainedFields {
  [key: string]: ConstrainedFieldInterface<Constrainable>;
}

export type Validators = {
  [key in keyof Constraints<Constrainable>]: keyof ValidityState
};

export type Validities<T extends Constrainable> = {
  [key in keyof Constraints<T>]: boolean;
};
