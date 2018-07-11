import {
  Constrainable,
  Constraints,
  Config,
  ErrorMessages,
  Validators,
  Validities
} from './types';

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

  private _config!: Config<T>;
  private _validities!: Validities<T>;
  private listens: T[] = [];

  constructor(el: T, config: Config<T>) {
    this.el = el;
    this.config = config;
    this.addListener(el);
    this.el.addEventListener('invalid', this.setCustomValidity, { passive: true });
  }

  public get config() {
    return this._config;
  }

  public set config(config: Config<T>) {
    this._config = config;
    this.refreshValidities();
  }

  public get validities() {
    return this._validities;
  }

  public init() {
    this.refreshValidities();
    if (this.el.form) {
      this.el.form.reportValidity();
    }
  }

  public destroy = () => {
    this.listens.map(el => this.removeListener(el));
  };

  public addListener = (el: T) => {
    el.addEventListener('input', this.refreshValidities, { passive: true });
    this.listens.push(el);
  };

  public removeListener = (el: T) => {
    el.removeEventListener('input', this.refreshValidities);
  };

  public refreshValidities = () => {
    const validities: Validities<T> = {};
    for (const key of Object.keys(this._config.constraints) as [
      keyof Constraints<T>
    ]) {
      validities[key] = !this.el.validity[validators[key]];
    }

    this._validities = validities;
  };

  private setCustomValidity = () => {
    let errorMessage = this.el.validationMessage;
    let hasCustomErrorMessage = false;
    for (const key of Object.keys(this._config.errorMessages) as [keyof Config<T>['errorMessages']]) {
      if (this._config.errorMessages[key] && !this._config.constraints[key]) {
        hasCustomErrorMessage = true;
        errorMessage = this._config.errorMessages[key] as string;
      }
    }
    if (hasCustomErrorMessage) {
      this.el.setCustomValidity(errorMessage);
    }
  }
}
