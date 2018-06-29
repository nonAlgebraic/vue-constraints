import Vue from 'vue';
import Component from 'vue-class-component';
import ConstraintsDirective from './directive';
import ConstrainedField from './field';
import {
  HTMLConstrainableElement,
  ConstrainedFields,
  Constraints
} from './types';

@Component({
  directives: {
    constraints: ConstraintsDirective
  }
})
export default class ConstraintsMixin extends Vue {
  public constrainedFields: ConstrainedFields = {};

  public bindConstrainedField = <T extends HTMLConstrainableElement>(
    name: string,
    el: T,
    constraints: Constraints<T>
  ) => {
    this.$set(
      this.constrainedFields,
      name,
      new ConstrainedField(el, constraints)
    );
  }

  public updateConstrainedField = (name: string, constraints: Constraints<HTMLConstrainableElement>) => {
    this.$set(this.constrainedFields[name], 'constraints', constraints);
  }

  public unbindConstrainedField = (name: string) => {
    this.$set(this.constrainedFields, name, undefined);
  }
}
