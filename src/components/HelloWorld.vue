<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <InputText v-model="pass" name="pass" label="Password" :constraints="{required: true, minLength: 8}" />
    <InputText v-model="passConfirm" name="passConfirm" label="Confirm passowrd" :constraints="{required: true, pattern: pass}" />
    <InputRadio v-model="radio" name="radio" label="Foo or Bar?" :constraints="{required: true}" :options="{foo: 'Foo', bar: 'Bar'}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputText from '@/components/input/InputText.vue';
import InputRadio from '@/components/input/InputRadio.vue';
import { Constraints } from '@/vue-constraints';

@Component({
  components: {
    InputText,
    InputRadio,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private pass: string = '';
  private passConfirm: string = '';
  private radio: string = '';
  private constraints: Constraints<HTMLInputElement> = {
    required: true,
    type: 'password',
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
