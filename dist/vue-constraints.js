import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
const diffConstraints = (newObj, oldObj) => {
    if (!newObj && !oldObj) {
        return null;
    }
    else if (newObj && !oldObj) {
        return newObj;
    }
    else if (!newObj && oldObj) {
        newObj = {};
        for (const key of Object.keys(oldObj)) {
            newObj[key] = null;
        }
        return newObj;
    }
    const diff = {};
    const keys = Object.getOwnPropertyNames(newObj).concat(Object.getOwnPropertyNames(oldObj));
    let isDiff = false;
    for (const key of keys) {
        if (newObj[key] !== oldObj[key]) {
            isDiff = true;
            if (typeof newObj[key] === 'undefined') {
                diff[key] = null;
            }
            else {
                diff[key] = newObj[key];
            }
        }
    }
    return isDiff ? diff : null;
};
const constrain = (fieldName, el, constraints, vnode) => {
    // TODO: deal with type missing
    for (const key of Object.keys(constraints)) {
        const constraint = constraints[key];
        if (constraint === null) {
            el.removeAttribute(key);
            if (vnode.context) {
                Vue.set(vnode.context.$fields[fieldName].constraints, key, undefined);
            }
        }
        else if (typeof constraint !== 'undefined') {
            el[key] = constraint;
            if (vnode.context) {
                Vue.set(vnode.context.$fields[fieldName].constraints, key, constraint);
            }
        }
    }
};
export const ConstraintDirective = {
    bind: (el, binding, vnode) => {
        if (vnode.context) {
            Vue.set(vnode.context.$fields, binding.arg, {
                el,
                constraints: {},
            });
        }
        if (binding.value) {
            constrain(binding.arg, el, binding.value, vnode);
        }
    },
    update: (el, binding, vnode) => {
        const diff = diffConstraints(binding.value, binding.oldValue);
        if (diff) {
            constrain(binding.arg, el, diff, vnode);
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
let ConstraintsMixin = class ConstraintsMixin extends Vue {
    beforeCreate() {
        this.$fields = {};
    }
};
ConstraintsMixin = tslib_1.__decorate([
    Component({
        directives: { ConstraintDirective },
    })
], ConstraintsMixin);
export { ConstraintsMixin };
export default {
    install(vue) {
        Vue.mixin(ConstraintsMixin);
    },
};
//# sourceMappingURL=vue-constraints.js.map