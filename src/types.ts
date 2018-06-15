type HTMLInputElementType = 'button'
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

type ConstraintTypes = 'required'
  | 'pattern'
  | 'min'
  | 'max'
  | 'step'
  | 'minLength'
  | 'maxLength'
  | 'multiple';

interface ConstraintAttributes extends Pick<HTMLInputElement, ConstraintTypes> {
  type: HTMLInputElementType;
}

export interface Constraints extends Partial<ConstraintAttributes> {
  [key: string]: ConstraintAttributes[keyof ConstraintAttributes] | null | undefined ;
}
