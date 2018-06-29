import { Constrainable, Constraints, Validities } from './types';
import getValidities from './getValidities';

export default class ConstrainedField<T extends Constrainable> {
  public el: T;
  public constraints: Constraints<T>
  public validities: Validities<T>;


  constructor(el: T, constraints: Constraints<T>) {
    this.el = el;
    this.constraints = constraints;
    this.validities = getValidities(this.el, this.constraints);
    this.el.addEventListener('input', () => this.updateValidities(), {passive: true})
  }

  private updateValidities() {
    this.validities = getValidities(this.el, this.constraints);
  }


}
