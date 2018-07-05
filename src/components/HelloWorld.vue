<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <InputText v-model="pass" name="pass" label="Password" :constraints="{required: true, minLength: 8, maxLength: 10}" />
    <InputText v-model="passConfirm" name="passConfirm" label="Confirm passowrd" :constraints="{required: true, pattern: pass}" />
    <InputText v-model="passConfirm" name="email" label="Email" :constraints="{required: true, type: 'email', minLength: 20}" />
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
  private email: string = '';
  private radio: string = '';
}
</script>

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
