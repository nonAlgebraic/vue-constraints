import { ConstrainedFieldInterface, ConstraintsConfig, Validities } from './types';
import getValidities from './validities';


export default class ConstrainedField implements ConstrainedFieldInterface {
  public el: HTMLInputElement;
  public constraints: ConstraintsConfig;
  public validities: Validities;

  constructor(el: HTMLInputElement, config: ConstraintsConfig) {
    this.el = el;
    this.constraints = config;
    this.validities = getValidities(el, config);
  }


}
