import Vue from 'vue';
import { ConstrainedFields, Constrainable, Constraints } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    constrainedFields: ConstrainedFields;
    bindConstrainedField: <T extends Constrainable> (
      name: string,
      el: T,
      config: Constraints<T>
    ) => void;
    updateConstrainedField: <T extends Constrainable> (name: string, config: Constraints<T>) => void;
    unbindConstrainedField: (name: string) => void;
  }
}
