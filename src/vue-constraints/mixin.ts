import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ConstraintsDirective from './directive';
import ConstrainedField from './field';
import { ComponentWithConstrainedFields, ConstrainedFields, ConstraintsConfig, ConstrainedFieldInterface } from './types';

@Component({
  directives: {
    'constraints': ConstraintsDirective,
  }
})
export default class ConstraintsMixin extends Vue implements ComponentWithConstrainedFields {

  public constrainedFields: ConstrainedFieldInterface = {};

  public bindConstrainedField(name: string, el: HTMLInputElement, config: ConstraintsConfig) {
    const constrainedFields = new ConstrainedField(el, config)
    debugger;
    this.$set(this.constrainedFields, name, constrainedFields);
  }

  public updateConstrainedField(name: string, config: ConstraintsConfig) {
    this.$set(this.constrainedFields[name], 'constraints', config);
  }

  public unbindConstrainedField(name: string) {
    this.$set(this.constrainedFields, name, undefined);
  }
}
