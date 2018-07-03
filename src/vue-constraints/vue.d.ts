import Vue from 'vue';
import { ConstrainedFields, Constrainable } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    readonly constrainedFields?: ConstrainedFields;
  }
}
