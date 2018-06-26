import { Validators, ConstraintsConfig } from './types';
const validators: Validators = {
  pattern: el => !el.validity.patternMismatch,
  min: el => !el.validity.rangeUnderflow,
  max: el => !el.validity.rangeOverflow,
  step: el => !el.validity.stepMismatch,
  minLength: el => !el.validity.tooShort,
  maxLength: el => !el.validity.tooLong,
  required: el => !el.validity.valueMissing,
  type: el => !el.validity.typeMismatch,
};
export default validators;
