<template>
  <div class="constraints-debug">
    <v-card v-for="(field, index) in fieldsArray" :key="index">
      <v-card-title>{{ field.name }}</v-card-title>

      <v-data-table
        :headers="headers"
        :items="field.constraints"
        hide-actions
        class="constrained-field elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr :class="{invalid: !props.item.validity, valid: props.item.validity}">
            <td>{{ props.item.constraint }}</td>
            <td>{{ props.item.config }}</td>
            <td>{{ props.item.validity }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
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
    for (const field of Object.keys(this.fields)) {
      const el = this.fields[field].el
      const constraints = [];
      for (const constraint of Object.keys(this.fields[field].constraints) as [keyof Constraints<typeof el>]) {
        constraints.push({
          constraint,
          config: this.fields[field].constraints[constraint],
          validity: this.fields[field].validities[constraint],
        });
      }

      fields.push({
        name: field,
        constraints,
      });
    }
    return fields;
  }
}
</script>

<style scoped lang="sass" scpoped>
.constraints-debug
  top: 20px
  left: 20px
  max-width: 500px
  text-align: left

  tbody
    font-family: monospace

  tr.invalid td
    background-color: rgba(#f00, .3)

</style>
