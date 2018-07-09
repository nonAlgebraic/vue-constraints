import Vue, { VNodeDirective, DirectiveOptions } from 'vue';
import { diff as doDiff } from 'deep-object-diff';
import {
  Constraints,
  ConstraintsConfig,
  Config,
  Diff,
  Constraint,
  Constrainable,
} from './types';
import { isConstrainable, isConstraintAttribute, isConstraintsConfigObject, isConstraint, isComponentWithConstrainedFields } from './guards';



const constrain = <T extends Constrainable>(
  el: T,
  constraints: Diff<Constraints<T>>
) => {
  // TODO: deal with type missing
  for (const key of Object.keys(constraints) as [keyof typeof constraints]) {
    const constraint = constraints[key];
    if (typeof constraint !== 'undefined') {
      el[key] = constraint as Constraint<T, typeof key>;
    } else {
      el.removeAttribute(key);
    }
  }
};

const normalizeConfig = <T extends Constrainable>(
  config: any,
  el: T
): Config<T> | undefined => {
  if (typeof config === 'object') {
    const keys = Object.keys(config);
    if (keys.length >=1 ) {
      const normalizedConfig: Config<T> = { constraints: {}, errorMessages: {} };
      for (const key of keys) {
        if (isConstraintAttribute(key, el, true)) {
          const val = config[key];
          if (isConstraintsConfigObject(val, key, el)) {
            normalizedConfig.constraints[key] = val.constraint;
            normalizedConfig.errorMessages[key] = val.errorMessage;
          } else if (isConstraint(val, key, el)){
            normalizedConfig.constraints[key] = val;
          } else {
            throw new TypeError(`Config object property values must be either "string" or "{constraint: string, errorMessage?: string}", but ${val} was provided for property ${key}`);
          }
        }
      }

      return normalizedConfig;
    } else {
      throw new TypeError(`Constraints directive must be provided a valid config object, but an empty object was provided.`);
    }
  } else {
    throw new TypeError(`Constraints directive must be passed a config object, but ${typeof config} was provided.`);
  }
};

export default {
  bind: (el, binding, vnode) => {
    if (isConstrainable(el, true)) {
      const config = normalizeConfig(binding.value, el);
      if (config) {
        constrain(el, config.constraints);

        if (isComponentWithConstrainedFields(vnode.context)) {
          vnode.context.setConstrainedField(el, config);
        }
      }
    }
  },
  update: (el, binding, vnode) => {
    if (isConstrainable(el, true)) {
      const oldConfig = normalizeConfig(binding.oldValue, el);
      const newConfig = normalizeConfig(binding.value, el);
      if (oldConfig && newConfig) {
        const diff = doDiff(oldConfig, newConfig) as Diff<Config<typeof el>>;

        if (diff.constraints) {
          constrain(el, diff.constraints);
        }

        if (
          isComponentWithConstrainedFields(vnode.context) &&
          (diff.constraints || diff.errorMessages)
        ) {
          vnode.context.setConstrainedField(el, newConfig);
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
