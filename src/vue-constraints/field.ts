import { Constrainable, Constraints, Validities } from './types';
import getValidities from './getValidities';

export default class ConstrainedField<T extends Constrainable> {
  public readonly el: T;
  private _validities!: Validities<T>;
  private _constraints!: Constraints<T>;

  constructor(el: T, constraints: Constraints<T>) {
    this.el = el;
    this.constraints = constraints;
    this.el.addEventListener('input', this.updateValidities, { passive: true });
  }

  public get constraints() {
    return this._constraints;
  }

  public set constraints(constraints: Constraints<T>) {
    this._constraints = constraints;
    this.updateValidities();
  }

  public get validities() {
    return this._validities;
  }

  public destroy = () => {
    this.el.removeEventListener('input', this.updateValidities);
  }

  private updateValidities = () => {
    this._validities = getValidities(this.el, this._constraints);
  }
}
