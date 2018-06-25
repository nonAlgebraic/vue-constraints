import Vue, { VNode, DirectiveOptions } from 'vue';
import { ConstraintOptions, ConstraintsDiff, ConstraintAttributes, ComponentWithConstrainedFields } from './types';
import ConstraintsMixin from './mixin';

const diffConstraints = (
  newObj: ConstraintOptions,
  oldObj: ConstraintOptions
): ConstraintOptions | null => {
  if (!newObj && !oldObj) {
    return null;
  } else if (newObj && !oldObj) {
    return newObj;
  } else if (!newObj && oldObj) {
    newObj = {};
    for (const key of Object.keys(oldObj) as [keyof ConstraintOptions]) {
      newObj[key] = null;
    }
    return newObj;
  }
  const diff: ConstraintOptions = {};
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

const constrain = (
  el: HTMLInputElement,
  constraints: Constraints,
) => {
  // TODO: deal with type missing
  for (const key of Object.keys(constraints) as Array<keyof ConstraintAttributes>)  {
    const constraint = constraints[key];

    if (constraint === null) {
      el.removeAttribute(key);
    } else if (typeof constraint !== 'undefined') {
      el[key] = constraint;
    }
  }
};

const isHTMLInputElement = (el: HTMLElement): el is HTMLInputElement => {
  if (!(el instanceof HTMLInputElement)) {
    throw new TypeError(`element ${el} is not an HTMLInputElement!`);
  }
  return true;
}

const isComponentWithConstrainedFields = (vue?: Vue): vue is ComponentWithConstrainedFields => {
  if (vue && vue.$constrainedFields) {
    return true;
  } else {
    return false;
  }
}

export default {
  bind: (el, binding, vnode) => {
    if (isHTMLInputElement(el)) {
      constrain(el, binding.value as Constraints);
      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.bindConstrainedField(el.name, el, binding.value);
      }
    }
  },
  update: (el, binding, vnode) => {
    if (isHTMLInputElement(el)) {
      const diff = diffConstraints(binding.value, binding.oldValue);
      if (diff) {
        constrain(el, diff);

        if (isComponentWithConstrainedFields(vnode.context)) {
          vnode.context.updateConstrainedField(el.name, diff);
        }
      }
    }

  },
  unbind: (el, binding, vnode) => {
    if (isHTMLInputElement(el)) {
      for (const key of Object.keys(binding.value)) {
        el.removeAttribute(key);
      }

      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.unbindConstrainedField(el.name);
      }
    }
  },
} as DirectiveOptions;
