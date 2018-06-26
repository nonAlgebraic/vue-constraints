import { ConstraintsConfig, Validators, ValiditiesInterface } from './types';

const validators: Validators = {
  pattern: 'patternMismatch',
  min: 'rangeUnderflow',
  max: 'rangeOverflow',
  step: 'stepMismatch',
  minLength: 'tooShort',
  maxLength: 'tooLong',
  required: 'valueMissing',
  type: 'typeMismatch',
};

export default class Validities implements ValiditiesInterface {
  private el: HTMLInputElement;
  private config: ConstraintsConfig;

  constructor(el: HTMLInputElement, config: ConstraintsConfig) {
    this.el = el;
    this.config = config;
  }

  get pattern() {
    return this.el.validity.patternMismatch;
  }

  get min() {
    return this.el.validity.rangeUnderflow;
  }

  get max() {
    return this.el.validity.rangeOverflow;
  }

  get step() {
    return this.el.validity.stepMismatch;
  }

  get minLength() {
    return this.el.validity.tooShort;
  }

  get maxLength() {
    return this.el.validity.tooLong;
  }

  get required() {
    return this.el.validity.valueMissing;
  }

  get type() {
    return this.el.validity.typeMismatch;
  }
}

// export default (el: HTMLInputElement, config: ConstraintsConfig) => {
//   const validities: Validities = {};
//   for (const key of Object.keys(config) as [keyof ConstraintsConfig]) {
//     validities[key] = !el.validity[validators[key]]
//   }

//   return validities;
// }
