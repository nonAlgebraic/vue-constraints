import Vue from 'vue';
import Component from 'vue-class-component';
import ConstraintsDirective from './directive';
import { ComponentWithConstrainedFields, ConstrainedFields, ConstraintsConfig, ConstraintAttributes, Validities } from './types';

const validators = {

}

const buildValitidiesObject = (el: HTMLInputElement, config: ConstraintsConfig) => {
  const validators: Validities = {

  }
  for (const key of Object.keys(config) as [keyof ConstraintsConfig]) {
    validities[key] = validators[key](el)
  }
}

@Component({
  directives: {
    'constraints': ConstraintsDirective,
  },
})
export default class ConstraintsMixin extends Vue implements ComponentWithConstrainedFields {
  public $constrainedFields: ConstrainedFields = {};

  public beforeCreate() {
    this.$constrainedFields = {};
  }

  public bindConstrainedField(name: string, el: HTMLInputElement, config: ConstraintsConfig) {
    this.$set(this.$constrainedFields, name, {
      el,
      constraints,
    });
  }

  public updateConstrainedField(name: string, config: ConstraintsConfig) {
    this.$set(this.$constrainedFields[name], 'constraints', constraints);
  }

  public unbindConstrainedField(name: string) {
    this.$set(this.$constrainedFields, name, undefined);
  }
}
