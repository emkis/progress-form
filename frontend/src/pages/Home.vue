<template>
  <main>
    <form @submit.prevent="handleSubmit">
      <BaseInput label="Name" v-model="name" />
      <BaseInput label="Email" v-model="email" />
      <BaseInput label="Phone" v-model="phone" />
      <BaseInput label="City" v-model="city" />
      <BaseInput label="FU" maxlength="2" v-model="fu" />

      <ul class="categories-list" ref="categories">
        <li
          class="categories-list__item"
          :data-categorie-name="categorie.name"
          v-for="categorie in CATEGORIES"
          :key="categorie.name"
        >
          <BaseSelectInput
            v-for="(question, index) in categorie.questions"
            :key="index + categorie.name"
            :label="question"
            :options="OPTIONS"
          />
        </li>
      </ul>

      <BaseButton type="submit">Send</BaseButton>
    </form>
  </main>
</template>

<script>
import { answerOptions, categories } from '@/utils/constants'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseSelectInput from '@/components/BaseSelectInput'

export default {
  components: { BaseInput, BaseButton, BaseSelectInput },
  created() {
    this.OPTIONS = Object.freeze([...answerOptions])
    this.CATEGORIES = Object.freeze([...categories])
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      city: '',
      fu: '',

      personality: {
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
    async handleSubmit() {
      this.calculateResults()
    },
    calculateResults() {
      const categoriesElements = Array.from(this.$refs.categories.children)

      const results = categoriesElements.map(categorie => {
        const { categorieName } = categorie.dataset

        const categorieQuestions = Array.from(categorie.children)

        const answers = categorieQuestions.map(question =>
          parseInt(question.lastChild.value)
        )

        const result = answers.reduce(
          (accumulator, currentValue) => (accumulator += currentValue)
        )

        return { categorie: categorieName, answers, result }
      })

      console.log(results)
      return results
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

main {
  margin: 50px;

  * + * {
    margin-top: 20px;
  }
}
</style>
