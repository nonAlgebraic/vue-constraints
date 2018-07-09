import Vue from 'vue';
import { Constraints, Constrainable, ComponentWithConstrainedFields, ConstraintAttribute, Constraint, ConstraintsConfig, ConstraintsConfigObject } from './types'

interface ValidConstraints {
  HTMLSelectElement: Required<Constraints<HTMLSelectElement>>;
  HTMLTextAreaElement: Required<Constraints<HTMLTextAreaElement>>;
  HTMLInputElement: Required<Constraints<HTMLInputElement>>;
};

export const isConstrainable = (el: HTMLElement, throwError?: boolean): el is Constrainable => {
  if (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement
  ) {
    return true;
  } else {
    if (throwError) {
      throw new TypeError(`Constraints directive can only be used on HTMLSelectElement, HTMLTextAreaElement, or HTMLInputElement but ${el} was passed.`)
    }
    return false;
  }
}

const getValidConstraints = (() => {
  const validConstraints: ValidConstraints = {
    HTMLSelectElement: {
      required: true,
    },
    HTMLTextAreaElement: {
      required: true,
      minLength: 1,
      maxLength: 1,
      type: '',
    },
    HTMLInputElement: {
      required: true,
      minLength: 1,
      maxLength: 1,
      min: '',
      max: '',
      step: '',
      type: 'text',
      pattern: '',
    }
  }

  return <T extends Constrainable>(el: T) => {
    const elType: keyof ValidConstraints = el instanceof HTMLSelectElement ? 'HTMLSelectElement' : el instanceof HTMLTextAreaElement ? 'HTMLTextAreaElement' : 'HTMLInputElement';
    return validConstraints[elType] as Required<Constraints<T>>;
  }
})();

export const isConstraintAttribute = <T extends Constrainable>(val: any, el: T, throwError?: boolean): val is ConstraintAttribute<T> => {
  if (val in getValidConstraints(el)) {
    return true;
  } else {
    if (throwError) {
      throw new TypeError(`${val} is not a valid contraint property for ${el}`);
    }
    return false;
  }
}

export const isConstraint = <T extends Constrainable, V extends ConstraintAttribute<T>>(val: any, attr: V, el: T, throwError?: boolean): val is Constraint<T, V> => {
  const validType = typeof getValidConstraints(el)[attr];
  if (typeof val === validType) {
    return true;
  } else {
    if (throwError) {
      throw new TypeError(`Constraint "${attr}" must be of type ${validType}, but ${typeof val} was provided.`);
    }
    return false;
  }
}

export const isConstraintsConfigObject = <
  T extends Constrainable,
  V extends ConstraintAttribute<T>
>(
  val: any,
  attr: V,
  el: T
): val is ConstraintsConfigObject<T, V> => isConstraint(val.constraint, attr, el) && (
  typeof val.errorMessage === 'string' ||
  typeof val.errorMessage === 'undefined'
)

export const isComponentWithConstrainedFields = (
  vue?: Vue
): vue is ComponentWithConstrainedFields => {
  if (vue && vue.constrainedFields) {
    return true;
  } else {
    return false;
  }
};
