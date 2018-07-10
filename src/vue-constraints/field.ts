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
    let errorMessage = '';
    for (const key of Object.keys(this._config.constraints) as [
      keyof Constraints<T>
    ]) {
      validities[key] = !this.el.validity[validators[key]];
      if (!validities[key] && this._config.errorMessages[key]) {
        errorMessage = this._config.errorMessages[key] as string;
        this.el.checkValidity();
      }
    }

    this._validities = validities;

    if (errorMessage !== '') {
      this.el.setCustomValidity(errorMessage);
    }

  };
}
