import Vue from 'vue';
import Component from 'vue-class-component';
import ConstraintsDirective from './directive';
import ConstrainedField from './field';
import {
  Constrainable,
  ConstrainedFields,
  Constraints,
  ComponentWithConstrainedFields
} from './types';

@Component({
  directives: {
    constraints: ConstraintsDirective
  }
})
export default class ConstraintsMixin extends Vue
  implements ComponentWithConstrainedFields {
  public readonly constrainedFields: ConstrainedFields = {};

  public setConstrainedField<T extends Constrainable>(
    el: T,
    constraints?: Constraints<T>
  ) {
    if (constraints) {
      if (!this.constrainedFields[el.name]) {
        this.$set(
          this.constrainedFields,
          el.name,
          new ConstrainedField(el, constraints)
        );
      } else if (this.constrainedFields[el.name].el === el) {
        this.constrainedFields[el.name].constraints = constraints;
      } else {
        this.constrainedFields[el.name].addListener(el);
      }
    } else if (this.constrainedFields[el.name].el === el) {
      this.constrainedFields[el.name].destroy();
      this.$set(this.constrainedFields, el.name, undefined);
    } else {
      this.constrainedFields[el.name].removeListener(el);
    }
  }

  public mounted() {
    for (const key of Object.keys(this.constrainedFields)) {
      this.constrainedFields[key].updateValidities();
    }
  }
}
