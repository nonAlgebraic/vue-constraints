import Vue, { DirectiveOptions, PluginObject, VueConstructor, VNode } from 'vue';
import Component from 'vue-class-component';
import { Constraints, ConstraintAttributes, ConstrainedFields } from './types';

export { Constraints };

const diffConstraints = (newObj: Constraints, oldObj: Constraints): Constraints | null => {
  if (!newObj && !oldObj) {
    return null;
  } else if (newObj && !oldObj) {
    return newObj;
  } else if (!newObj && oldObj) {
    newObj = {};
    for (const key of Object.keys(oldObj)) {
      newObj[key] = null;
    }
    return newObj;
  }
  const diff: Constraints = {};
  const keys = Object.getOwnPropertyNames(newObj).concat(Object.getOwnPropertyNames(oldObj));
  let isDiff = false;

  for (const key of keys) {
    if (newObj[key] !== oldObj[key]) {
      isDiff = true;
      if (typeof newObj[key] === 'undefined') {
        diff[key] = null;
      } else {
        diff[key] = newObj[key];
      }
    }
  }

  return isDiff ? diff : null;
};

const constrain = (fieldName: string, el: HTMLInputElement, constraints: Constraints, vnode: VNode) => {
  // TODO: deal with type missing
  for (const key of Object.keys(constraints) as Array<keyof ConstraintAttributes>)  {
    const constraint = constraints[key];

    if (constraint === null) {
      el.removeAttribute(key);
      if (vnode.context) {
        Vue.set(vnode.context.$fields[fieldName].constraints, key, undefined);
      }
    } else if (typeof constraint !== 'undefined') {
      el[key] = constraint;
      if (vnode.context) {
        Vue.set(vnode.context.$fields[fieldName].constraints, key, constraint);
      }
    }
  }
};

export const ConstraintDirective: DirectiveOptions = {
  bind: (el, binding, vnode) => {
    if (vnode.context) {
      Vue.set(vnode.context.$fields, binding.arg, {
        el,
        constraints: {},
      });
    }

    if (binding.value) {
      constrain(binding.arg, el as HTMLInputElement, binding.value, vnode);
    }
  },
  update: (el, binding, vnode) => {
    const diff = diffConstraints(binding.value, binding.oldValue);
    if (diff) {
      constrain(binding. arg, el as HTMLInputElement, diff, vnode);
    }
  },
  unbind: (el, binding, vnode) => {
    if (vnode.context) {
      for (const key of Object.keys(vnode.context.$fields)) {
        el.removeAttribute(key);
        Vue.set(vnode.context.$fields, key, undefined);
      }
    }
  },
};

@Component({
  directives: {ConstraintDirective},
})
export class ConstraintsMixin extends Vue {
  public beforeCreate() {
    this.$fields = {};
  }
}

export default {
  install(vue: VueConstructor<Vue>) {
    Vue.mixin(ConstraintsMixin);
  },
} as PluginObject<never>;
