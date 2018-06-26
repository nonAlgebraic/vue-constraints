<template>
  <div class="input input--text">
    <label class="input__label">{{ label }}</label>
    <input
      :value="value"
      :name="name"
      v-on:input="$emit('input', $event.target.value)"
      v-constraints="constraints"
      type="text"
      class="input__element" />
    <div>{{constrainedFields}}</div>
    <button type="button" v-on:click="logFields">click</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import InputMixin from '@/mixins/InputMixin';
import { ConstraintsMixin } from '@/vue-constraints';

@Component
export default class InputText extends mixins(InputMixin) {
  logFields() {
    for (const key of Object.keys(this.constrainedFields)) {
      console.log(key, this.constrainedFields[key].validities);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
