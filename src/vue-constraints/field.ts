import { Constrainable, Constraints, Validators, Validities } from './types';

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

export default class ConstrainedField<T extends Constrainable> {
  public readonly el: T;
  public isTouched = false;
  public isDirty = false;
  private _validities!: Validities<T>;
  private _constraints!: Constraints<T>;
  private listens: T[] = [];
  private _isValid!: boolean;

  constructor(el: T, constraints: Constraints<T>) {
    this.el = el;
    this.constraints = constraints;
    this.addListener(el);
  }

  public get isValid() {
    return this._isValid;
  }

  public get constraints() {
    return this._constraints;
  }

  public set constraints(constraints: Constraints<T>) {
    this._constraints = constraints;
    this.refreshValidities();
  }

  public get validities() {
    return this._validities;
  }

  public destroy = () => {
    this.listens.map(el => this.removeListener(el));
  }

  public addListener = (el: T) => {
    el.addEventListener('input', this.refreshValidities, { passive: true });
    this.listens.push(el);
  }

  public removeListener = (el: T) => {
    el.removeEventListener('input', this.refreshValidities);
  }

  public refreshValidities = () => {
    const validities: Validities<T> = {};
    for (const key of Object.keys(this._constraints) as [keyof Constraints<T>]) {
      validities[key] = !this.el.validity[validators[key]];
    }

    this._validities = validities;
    this._isValid = this.el.validity.valid;
  }
}
