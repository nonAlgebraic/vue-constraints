<template>
  <div class="constraints-debug">
    <v-data-table :headers="headers" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ConstrainedFields } from '@/vue-constraints/types';

@Component
export default class ConstraintsDebug extends Vue {
  @Prop({default: {}}) private fields!: ConstrainedFields;
  private headers = [
    {
      text: 'constraint',
    },
    {
      text: 'config',
    },
    {
      text: 'validity',
    },
  ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" scpoped>
.constrained-field
  &__caption, &__row
    padding: .375rem 0
    text-align: left

  &__caption
    line-height: 4rem
    text-align: left
    font-size: 1.5rem

  &__row
    line-height: 3rem

    &__config
      padding: 0 1rem




</style>
