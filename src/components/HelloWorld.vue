<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <InputText v-model="pass" name="pass" label="Password" :constraints="passConstraints" />
    <InputText v-model="passConfirm" name="passConfirm" label="Confirm passowrd" :constraints="passConfirmConstraints" />
    <InputText v-model="email" name="email" label="Email" :constraints="emailConstraints" />
    <InputRadio v-model="radio" name="radio" label="Foo or Bar?" :constraints="radioConstraints" :options="{foo: 'Foo', bar: 'Bar'}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InputText from '@/components/input/InputText.vue';
import InputRadio from '@/components/input/InputRadio.vue';
import { ConstraintsConfig } from '@/vue-constraints';

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
  private passConstraints: ConstraintsConfig<HTMLInputElement> = {
    required: true,
    minLength: 8,
    maxLength: 10,
  };
  private passConfirmConstraints: ConstraintsConfig<HTMLInputElement> = {
    required: true,
    pattern: this.pass,
  };
  private emailConstraints: ConstraintsConfig<HTMLInputElement> = {
    required: true,
    type: 'email',
    minLength: 20,
  };

  private radioConstraints: ConstraintsConfig<HTMLInputElement> = {
    required: true,
  };
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
