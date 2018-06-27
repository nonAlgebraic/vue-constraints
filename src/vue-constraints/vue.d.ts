import Vue from 'vue';
import { ConstrainedFields } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    constrainedFields: ConstrainedFields;
  }
}
