import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ConstraintsDirective from './directive';
import ConstrainedField from './field';
import {
  ComponentWithConstrainedFields,
  ConstrainedFields,
  Constraints
} from './types';

@Component({
  directives: {
    constraints: ConstraintsDirective
  }
})
export default class ConstraintsMixin extends Vue
  implements ComponentWithConstrainedFields {
  public constrainedFields: ConstrainedFields = {};

  public bindConstrainedField(
    name: string,
    el: HTMLInputElement,
    constraints: Constraints
  ) {
    this.$set(
      this.constrainedFields,
      name,
      new ConstrainedField(el, constraints)
    );
  }

  public updateConstrainedField(name: string, constraints: Constraints) {
    this.$set(this.constrainedFields[name], 'constraints', constraints);
  }

  public unbindConstrainedField(name: string) {
    this.$set(this.constrainedFields, name, undefined);
  }
}
