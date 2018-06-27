import { ConstrainedFieldInterface, Constraints, Validities } from './types';
import getValidities from './getValidities';

export default class ConstrainedField implements ConstrainedFieldInterface {
  public el: HTMLInputElement;
  public validities: Validities = {};
  public constraints: Constraints;

  constructor(el: HTMLInputElement, constraints: Constraints) {
    this.el = el;
    this.constraints = constraints;
    for (const key of Object.keys(constraints) as [keyof Constraints]) {
      this.validities = getValidities(this.el, this.constraints);
    }
    this.el.addEventListener('input', () => this.updateValidities(), {passive: true})
  }

  private updateValidities() {
    this.validities = getValidities(this.el, this.constraints);
  }


}
