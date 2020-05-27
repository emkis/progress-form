<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <BaseInput label="Name" v-model="name" />
      <BaseInput label="Email" v-model="email" />
      <BaseInput label="Phone" v-model="phone" />
      <BaseInput label="City" v-model="city" />
      <BaseInput label="FU" v-model="fu" />

      <BaseSelectInput
        v-for="question in QUESTIONS"
        :key="question"
        :label="question"
        v-model="name"
        :options="OPTIONS"
      />

      <BaseButton type="submit">Send</BaseButton>
    </form>
  </main>
</template>

<script>
import { answerOptions, questionsCategories } from '@/utils/constants'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseSelectInput from '@/components/BaseSelectInput'

export default {
  components: { BaseInput, BaseButton, BaseSelectInput },
  created() {
    this.OPTIONS = Object.freeze([...answerOptions])
    // this.QUESTIONS = Object.freeze([...questionsCategories])
    this.QUESTIONS = Object.freeze([1, 2, 3])
    questionsCategories
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      city: '',
      fu: '',

      personalityClassification: {
        realistic: 0,
        investigative: 0,
        entrepreneur: 0,
        conventional: 0,
        artistic: 0,
        social: 0,
      },
    }
  },
  methods: {
    async handleSubmit() {},
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

main {
  margin: 50px;

  div + div {
    margin-top: 20px;
  }
}
</style>
