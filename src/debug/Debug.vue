<template>
  <div class="constraints-debug">
    <v-data-table
    v-for="(field, index) in fieldsArray"
    :key="index"
    :headers="headers"
    :items="field.constraints"
    hide-actions
    class="constrained-field elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.constraint }}</td>
      <td>{{ props.item.config }}</td>
      <td>{{ props.item.validity }}</td>
    </template>
  </v-data-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ConstrainedFields, Constraints } from '@/vue-constraints';

@Component
export default class ConstraintsDebug extends Vue {
  @Prop({default: {}}) private fields!: ConstrainedFields;

  private headers = [
        {
          text: 'constraint',
          align: 'left',
          sortable: false,
          value: 'constraint',
        },
        {
          text: 'config',
          align: 'left',
          sortable: false,
          value: 'config',
        },
        {
          text: 'validity',
          align: 'left',
          sortable: false,
          value: 'validity',
        },
      ];

  private get fieldsArray() {
    const fields = [];
    for (const field in this.fields) {
      const constraints = [];
      for (const constraint of Object.keys(this.fields[field].constraints) as [keyof Constraints]) {
        constraints.push({
          constraint,
          config: this.fields[field].constraints[constraint],
          validity: this.fields[field].validities[constraint],
        });
      }

      fields.push({
        name: field,
        constraints: constraints,
      });
    }
    return fields;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass" scpoped>
.constraints-debug
  top: 20px
  left: 20px
  max-width: 500px
  text-align: left
  font-family: monospace




</style>
