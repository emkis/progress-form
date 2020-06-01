<template>
  <div>
    <h1>hi, {{ userId }}</h1>

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
  </div>
</template>

<script>
import { answerOptions, categories } from '@/utils/constants'
import BaseSelectInput from '@/components/BaseSelectInput'

export default {
  components: { BaseSelectInput },
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
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
  created() {
    this.OPTIONS = Object.freeze([...answerOptions])
    this.CATEGORIES = Object.freeze([...categories])
  },
  methods: {
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

<style lang="scss" scoped></style>
