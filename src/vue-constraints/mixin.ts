import Vue from 'vue';
import Component from 'vue-class-component';
import ConstraintsDirective from './directive';
import { ComponentWithConstrainedFields, ConstrainedFields, Constraints } from './types';

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

  public bindConstrainedField(name: string, el: HTMLInputElement, constraints: Constraints) {
    this.$set(this.$constrainedFields, name, {
      el,
      constraints,
    });
  }

  public updateConstrainedField(name: string, constraints: Constraints) {
    this.$set(this.$constrainedFields[name], 'constraints', constraints);
  }

  public unbindConstrainedField(name: string) {
    this.$set(this.$constrainedFields, name, undefined);
  }
}
