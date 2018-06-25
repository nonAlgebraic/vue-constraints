import Vue, { VueConstructor, PluginObject } from 'vue';
import ConstraintsMixin from './mixin';

export { ConstraintsMixin };
export { default as ConstraintsDirective } from './directive';
export * from './types';

export default {
  install(vue: VueConstructor<Vue>) {
    Vue.mixin(ConstraintsMixin);
  },
} as PluginObject<never>;
