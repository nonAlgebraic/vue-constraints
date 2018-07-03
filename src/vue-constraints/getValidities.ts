import { ConstraintAttribute, Constraints, Validities, Constrainable } from './types';

const validators: { [key in ConstraintAttribute]: keyof ValidityState } = {
  required: 'valueMissing',
  type: 'typeMismatch',
  pattern: 'patternMismatch',
  minLength: 'tooShort',
  maxLength: 'tooLong',
  min: 'rangeUnderflow',
  max: 'rangeOverflow',
  step: 'stepMismatch',
};

export default <T extends Constrainable>(el: T, constraints: Constraints<T>): Validities<T> => {
  const validities: Validities<T> = {};

  for (const key of Object.keys(constraints) as [keyof Constraints<T>]) {
    validities[key] = !el.validity[validators[key]];
  }

  return validities;
};
