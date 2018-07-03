import Vue, { VNode, DirectiveOptions } from 'vue';
import { Constraints, ComponentWithConstrainedFields, Constrainable } from './types';

const diffConstraints = <T extends Constrainable>(
  newObj: Constraints<T>,
  oldObj: Constraints<T>
): Constraints<T> | null => {
  if (!newObj && !oldObj) {
    return null;
  } else if (newObj && !oldObj) {
    return newObj;
  } else if (!newObj && oldObj) {
    const nullObj: Constraints<T> = {};
    for (const key of Object.keys(oldObj) as [keyof typeof oldObj]) {
      nullObj[key] = null;
    }
    return nullObj;
  }
  const diff: Constraints<T> = {};
  const keys = Object.keys(newObj).concat(Object.keys(oldObj)) as [
    keyof Constraints<Constrainable>
  ];

  const ha: Constraints<HTMLSelectElement> = {
    required: true,
    maxLength: 3,
  }
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

const constrain = <T extends Constrainable>(el: T, config: Constraints<T>) => {
  // TODO: deal with type missing
  for (const key of Object.keys(config) as [keyof typeof config]) {
    const constraint: Constraints<T>['required'] = config[key];

    if (typeof constraint === null) {
      el.removeAttribute(key);
    } else if (typeof constraint !== 'undefined') {
      el[key] = constraint;
    } else if (constraint) {
      el[key] = constraint;
    }
  }
};

const isConstrainable = (el: HTMLElement): el is Constrainable => {
  if (!(
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  )) {
    throw new TypeError(`element ${el} is not an HTMLInputElement!`);
  }

  return true;
};

const isComponentWithConstrainedFields = (
  vue?: Vue
): vue is ComponentWithConstrainedFields => {
  if (vue && vue.constrainedFields) {
    return true;
  } else {
    return false;
  }
};

export default {
  bind: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const constraints: Constraints<typeof el> = binding.value;
      constrain(el, binding.value);
      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.bindConstrainedField(el.name, el, constraints);
      }
    }
  },
  update: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const newConstraints: Constraints<typeof el> = binding.value;
      const oldConstraints: Constraints<typeof el> = binding.oldValue;
      const diff = diffConstraints(newConstraints, oldConstraints);
      if (diff) {
        constrain(el, diff);

        if (isComponentWithConstrainedFields(vnode.context)) {
          vnode.context.updateConstrainedField(el.name, diff);
        }
      }
    }
  },
  unbind: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const constraints: Constraints<typeof el> = binding.value;
      for (const key of Object.keys(constraints)) {
        el.removeAttribute(key);
      }

      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.unbindConstrainedField(el.name);
      }
    }
  }
} as DirectiveOptions;
