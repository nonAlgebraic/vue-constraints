import Vue, { VNode, DirectiveOptions } from 'vue';
import { diff } from 'deep-object-diff';
import {
  Constraints,
  DirectiveConfig,
  Config,
  Diff,
  DirectiveConfigObject,
  Constraint,
  ErrorMessages,
  Constrainable,
  ComponentWithConstrainedFields,
} from './types';

const isConstraint = <T extends Constrainable, V extends keyof Config<T>>(
  val: Config<T>[V]
): val is Constraint<T, V> => typeof val !== null;

const constrain = <T extends Constrainable>(el: T, constraints: Constraints<T>) => {
  // TODO: deal with type missing
  for (const key of Object.keys(constraints) as [keyof typeof constraints]) {
    const constraint = constraints[key];
    if (isConstraint(constraint)) {
      el[key] = constraint;
    } else {
      el.removeAttribute(key);
    }
  }
};

const isConstrainable = (el: HTMLElement): el is Constrainable => {
  if (
    !(
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    )
  ) {
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

const isDirectiveConfigObject = <T extends Constrainable, V extends keyof DirectiveConfig<T>>(val: DirectiveConfig<T>[V]): val is DirectiveConfigObject<T, V> => typeof val === 'object';

const normalizeConfig = <T extends Constrainable>(config: DirectiveConfig<T>): Config<T> => {
  const normalizedConfig: Config<T> = { constraints: {} };
  const errorMessages: ErrorMessages<T> = {};
  let hasErrorMessages = false;
  for (const key of Object.keys(config) as [keyof typeof config]) {
    const val = config[key];
    if (isDirectiveConfigObject(val)) {
      normalizedConfig.constraints[key] = val.constraint;
      errorMessages[key] = val.errorMessage;
      hasErrorMessages = true;
    } else {
      normalizedConfig.constraints[key] = val;
    }
  }

  if (hasErrorMessages) {
    normalizedConfig.errorMessages = errorMessages;
  }

  return normalizedConfig;
}

export default {
  bind: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const config = normalizeConfig(binding.value as DirectiveConfig<typeof el>);

      constrain(el, config);
      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.setConstrainedField(el, config);
      }
    }4
  },
  update: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const newConfig = normalizeConfig(binding.value as DirectiveConfig<typeof el>);
      const oldConfig = normalizeConfig(binding.oldValue as DirectiveConfig<typeof el>);
      const theDiff = diff(oldConfig, newConfig) as Diff<Config<typeof el>>;
      if (theDiff.constraints) {
        constrain(el, theDiff.constraints);
      }
      if (diff) {
        constrain(el, diff);

        if (isComponentWithConstrainedFields(vnode.context)) {
          vnode.context.setConstrainedField(el, newConstraints);
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
        vnode.context.setConstrainedField(el);
      }
    }
  }
} as DirectiveOptions;
