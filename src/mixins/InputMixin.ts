import Component, { mixins } from 'vue-class-component';
import { Prop, Vue } from 'vue-property-decorator';
import { Constraints, ConstraintsMixin } from '@/vue-constraints';

@Component
export default class InputMixin extends mixins(ConstraintsMixin) {
  @Prop() protected name!: string;
  @Prop() protected label!: string;
  @Prop() protected value?: string;
  @Prop() protected constraints?: Constraints;
}
