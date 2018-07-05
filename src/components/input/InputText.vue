<template>
  <label class="input input--text">
    <span class="input__label">{{ label }}</span>
    <input :value="value" :name="name" v-on:input="$emit('input', $event.target.value)" v-constraints="constraints" type="text" class="input__element" />
    <ConstraintsDebug :fields="constrainedFields" />
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import InputMixin from '@/mixins/InputMixin';
import { ConstraintsMixin } from '@/vue-constraints';

@Component
export default class InputText extends mixins(InputMixin) {}
</script>

<style scoped lang="sass">

</style>
