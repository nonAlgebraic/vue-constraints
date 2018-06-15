import { DirectiveOptions, PluginObject, VueConstructor } from 'vue';
import { Constraints } from './types';

export { Constraints };

/**
 * Returns the difference betweens two Constraints objects, or null if
 * they are equal.
 *
 * @param newObj the new Constraints object.
 * @param oldObj the old Constraints object.
 */
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

const constrain = (el: HTMLElement, constraints: Constraints) => {
  // TODO: deal with type missing
  const constraintsCopy = JSON.parse(JSON.stringify(constraints));
  for (const key of Object.keys(constraints)) {
    if (constraints[key] === null) {
      el.removeAttribute(key);
      delete constraintsCopy[key];
    }
  }
  Object.assign(el, constraintsCopy);
};

export const ConstraintDirective: DirectiveOptions = {
  bind: (el, binding) => {
    if (binding.value) {
      constrain(el, binding.value);
    }
  },
  update: (el, binding) => {
    const diff = diffConstraints(binding.value, binding.oldValue);
    if (diff) {
      constrain(el, diff);
    }
  },
};

export default {
  install(vue: VueConstructor) {
    vue.directive('constraints', ConstraintDirective);
  },
} as PluginObject<never>;
