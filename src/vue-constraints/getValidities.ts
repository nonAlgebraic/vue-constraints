import { Validators, Constraints, Validities, Constrainable } from './types';

const validators: Validators = {
  required: 'valueMissing',
  pattern: 'patternMismatch',
  type: 'typeMismatch',
  step: 'stepMismatch',
  min: 'rangeUnderflow',
  max: 'rangeOverflow',
  minLength: 'tooShort',
  maxLength: 'tooLong'
};

export default <T extends Constrainable>(
  el: T,
  constraints: Constraints<T>
): Validities<T> => {
  const validities: Validities<T> = {};
  for (const key of Object.keys(constraints) as [keyof Constraints<T>]) {
    validities[key] = !el.validity[validators[key]];
  }

  return validities;
};
