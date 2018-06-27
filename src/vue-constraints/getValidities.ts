import { Constraints, Validators, Validities } from './types';

export const validators: Validators = {
  pattern: 'patternMismatch',
  min: 'rangeUnderflow',
  max: 'rangeOverflow',
  step: 'stepMismatch',
  minLength: 'tooShort',
  maxLength: 'tooLong',
  required: 'valueMissing',
  type: 'typeMismatch'
};

export default (el: HTMLInputElement, constraints: Constraints): Validities => {
  const validities: Validities = {};
  for (const key of Object.keys(constraints) as [keyof Constraints]) {
    validities[key] = !el.validity[validators[key]];
  }
  return validities;
};
