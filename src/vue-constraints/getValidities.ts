import { Constraints, Validators, Validities, Constrainable } from './types';

export const validators: Validators = {

  min: 'rangeUnderflow',
  max: 'rangeOverflow',
  step: 'stepMismatch',
  minLength: 'tooShort',
  maxLength: 'tooLong',
  required: 'valueMissing',
  type: 'typeMismatch'
};

export default <T>(el: T, constraints: Constraints<T>): Validities<T> => {
  const validities: Validities<T> = {};
  constraints.
  for (const key of Object.keys(constraints) as [keyof Constraints<T>]) {
    validators[key]
    validities[key] = !el.validity[validators[key]];
  }
  return validities;
};
