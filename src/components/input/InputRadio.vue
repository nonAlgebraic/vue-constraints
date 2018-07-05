<template>
  <div class="input input--radio" role="radiogroup" :aria-labelled-by="name">
    <div :id="name" class="input--radio__label">{{ label }}</div>
    <label v-for="(optionLabel, optionValue) in options" :key="optionValue" class="input--radio__option">
      <span class="input__label">{{ optionLabel }}</span>
      <input :value="optionValue" :name="name" v-on:input="$emit('input', $event.target.value)" v-constraints="constraints" type="radio" class="input__element" />
    </label>
    <ConstraintsDebug :fields="constrainedFields" />
  </div>
</template>

<script lang="ts">
import Vue, { Prop } from 'vue-property-decorator';
import Component, { mixins } from 'vue-class-component';
import InputMixin from '@/mixins/InputMixin';
import { ConstraintsMixin } from '@/vue-constraints';

@Component
export default class InputRadio extends mixins(InputMixin) {
  @Prop() private options!: {[key: string]: string};
}
</script>

<style scoped lang="sass">

</style>
