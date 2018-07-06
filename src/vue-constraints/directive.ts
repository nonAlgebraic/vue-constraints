import Vue, { VNode, DirectiveOptions } from 'vue';
import {
  Constraints,
  ErrorMessages,
  Config,
  NullableConfig,
  ConfigObject,
  NullableConstraints,
  NullableErrorMessages,
  Constraint,
  Constrainable,
  ComponentWithConstrainedFields,
  NormalizedConfig
} from './types';

const diffConfigs = <T extends Constrainable>(
  newConfig: NormalizedConfig<T>,
  oldConfig: NormalizedConfig<T>
): NullableConfig<T> | null => {
  if (!newConfig && !oldConfig) {
    return null;
  }
  if (newConfig && !oldConfig) {
    return newConfig;
  }

  const diff: NullableConfig<T> = {};

  if (!newConfig && oldConfig) {
    for (const key of Object.keys(oldConfig) as [keyof typeof oldConfig]) {
      diff[key] = null;
    }

    return diff;
  }

  let isDiff = false;
  for (const key of [...Object.keys(newConfig), ...Object.keys(oldConfig)] as [
    keyof typeof newConfig
  ]) {
    const configObject = newConfig[key];
    if (isConfigObject(configObject)) {
      configObject.
    }
    // if (newConfig[key]. !== oldConfig.constraints[key]) {
    //   isDiff = true;
    //   if (typeof newConfig.constraints[key] === 'undefined') {
    //     diff.constraints[key] = null;
    //   } else {
    //     diff.constraints[key] = newConfig.constraints[key];
    //   }
    // }
  }

  return isDiff ? diff : null;
};

const isConstraint = <T extends Constrainable, V extends keyof Config<T>>(
  val: Config<T>[V]
): val is Constraint<T, V> => typeof val !== null;

const constrain = <T extends Constrainable>(el: T, config: NormalizedConfig<T>) => {
  // TODO: deal with type missing
  for (const key of Object.keys(config) as [keyof typeof config]) {
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

const isConfigObject = <T extends Constrainable, V extends keyof Config<T>>(val: Config<T>[V]): val is ConfigObject<T, V> => typeof val === 'object';

const normalizeConfig = <T extends Constrainable>(config: Config<T>): NormalizedConfig<T> => {
  const normalizedConfig: NormalizedConfig<T> = {};
  for (const key of Object.keys(config) as [keyof typeof config]) {
    const val = config[key];
    if (isConfigObject(val)) {
      normalizedConfig[key] = {constraint: val.constraint, errorMessage: val.errorMessage};
    } else if (isConstraint(val)) {
      normalizedConfig[key] = {constraint: val}
    }
  }

  return normalizedConfig;
}

export default {
  bind: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const config = normalizeConfig(binding.value as Config<typeof el>);

      constrain(el, config);
      if (isComponentWithConstrainedFields(vnode.context)) {
        vnode.context.setConstrainedField(el, config);
      }
    }
  },
  update: (el, binding, vnode) => {
    if (isConstrainable(el)) {
      const newConfig = normalizeConfig(binding.value as Config<typeof el>);
      const oldConfig = normalizeConfig(binding.oldValue as Config<typeof el>);
      const diff = diffConfigs(newConfig, oldConfig);
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
