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
          v-for="category in CATEGORIES"
          :key="category.name"
          :data-category-name="category.name"
        >
          <BaseSelectInput
            v-for="(question, index) in category.questions"
            :key="index + category.name"
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
import api from '@/services/api'

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
      const results = this.calculateResults()
      this.setPersonalities(results)

      try {
        const response = await api.post('/create-person', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          fu: this.fu,
        })

        const { id: personId } = response.data

        await api.post(`/store-result/${personId}`, this.personality)
      } catch (error) {
        throw Error(error)
      }
    },
    calculateResults() {
      const $categories = Array.from(this.$refs.categories.children)

      let calculatedPersonalities = {}

      $categories.forEach(category => {
        const { categoryName } = category.dataset
        const categoryQuestions = Array.from(category.children)

        const categoryAnswers = categoryQuestions.map(question =>
          question.lastChild.value ? parseInt(question.lastChild.value) : 0
        )

        const result = categoryAnswers.reduce(
          (accumulator, currentValue) => (accumulator += currentValue)
        )

        calculatedPersonalities = {
          ...calculatedPersonalities,
          [categoryName]: result,
        }
      })

      return calculatedPersonalities
    },
    setPersonalities(propsWithResults = {}) {
      Object.entries(propsWithResults).forEach(category => {
        const [categoryName, categoryPercentage] = category

        this.personality[categoryName] = categoryPercentage
      })
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
