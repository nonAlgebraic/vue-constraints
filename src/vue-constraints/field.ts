import { Constrainable, Constraints, Validities } from './types';
import getValidities from './getValidities';

export default class ConstrainedField<T extends Constrainable> {
  public readonly el: T;
  private _validities!: Validities<T>;
  private _constraints!: Constraints<T>;
  private listens: T[] = [];

  constructor(el: T, constraints: Constraints<T>) {
    this.el = el;
    this.constraints = constraints;
    this.addListener(el);
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
    this.listens.map(el => this.removeListener(el));
  }

  public updateValidities = () => {
    this._validities = getValidities(this.el, this._constraints);
  }

  public addListener = (el: T) => {
    el.addEventListener('input', this.updateValidities, { passive: true });
    this.listens.push(el);
  }

  public removeListener = (el: T) => {
    el.removeEventListener('input', this.updateValidities);
  }
}
