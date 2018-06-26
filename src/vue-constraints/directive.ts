import Vue, { VNode, DirectiveOptions } from 'vue';
import { ConstraintsConfig, ComponentWithConstrainedFields } from './types';

const diffConstraints = (
  newObj: ConstraintsConfig,
  oldObj: ConstraintsConfig
): ConstraintsConfig | null => {
  if (!newObj && !oldObj) {
    return null;
  } else if (newObj && !oldObj) {
    return newObj;
  } else if (!newObj && oldObj) {
    const nullObj: ConstraintsConfig = {};
    for (const key of Object.keys(oldObj) as [keyof ConstraintsConfig]) {
      nullObj[key] = null;
    }
    return nullObj;
  }
  const diff: ConstraintsConfig = {};
  const keys = Object.keys(newObj).concat(Object.keys(oldObj)) as [keyof ConstraintsConfig];
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
  config: ConstraintsConfig,
) => {
  // TODO: deal with type missing
  for (const key of Object.keys(config) as [keyof ConstraintsConfig])  {
    const constraint = config[key];

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
      const constraintsConfig: ConstraintsConfig = binding.value;
      constrain(el, binding.value);
      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.bindConstrainedField(el.name, el, constraintsConfig);
      }
    }
  },
  update: (el, binding, vnode) => {
    if (isHTMLInputElement(el)) {
      const newConstraintsConfig: ConstraintsConfig = binding.value;
      const oldConstraintsConfig: ConstraintsConfig = binding.oldValue;
      const diff = diffConstraints(newConstraintsConfig, oldConstraintsConfig);
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
      const constraintConfig: ConstraintsConfig = binding.value;
      for (const key of Object.keys(constraintConfig)) {
        el.removeAttribute(key);
      }

      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.unbindConstrainedField(el.name);
      }
    }
  },
} as DirectiveOptions;
