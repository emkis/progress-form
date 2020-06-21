<template>
  <main class="survey">
    <Container>
      <header class="survey__header">
        <div class="survey__header-container">
          <button @click="previousQuestion" :disabled="!hasPreviousQuestion">
            <IconArrowLeft size="25" color="#9C9CA3" />
          </button>
          <StepCounter
            :current-step="currentQuestion"
            :total-steps="TOTAL_STEPS"
          />
        </div>

        <ProgressBar :percentage="surveyProgress" />
      </header>

      <transition :name="transitionName" mode="out-in" appear>
        <SurveyQuestion :key="currentQuestion">
          {{ questionText }}
        </SurveyQuestion>
      </transition>
    </Container>

    <div class="answers-container">
      <Container>
        <transition :name="transitionName" mode="out-in" appear>
          <div :key="currentQuestion">
            <SurveyButton
              v-for="alternative in ALTERNATIVES"
              :key="alternative.value"
              @click.once="nextQuestion(alternative.value)"
              :disabled="allQuestionsAnswered"
            >
              <template #option>{{ alternative.option }}</template>
              <template #answer>{{ alternative.answer }}</template>
            </SurveyButton>
          </div>
        </transition>
      </Container>
    </div>
  </main>
</template>

<script>
import api from '@/services/api'
import { answerAlternatives, questions } from '@/utils/constants'
import calculatePercentage from '@/utils/calculatePercentage'

import Container from '@/components/Container'
import ProgressBar from '@/components/ProgressBar'
import StepCounter from '@/components/StepCounter'
import SurveyButton from '@/components/SurveyButton'
import SurveyQuestion from '@/components/SurveyQuestion'
import { IconArrowLeft } from '@/components/icons'

const TRANSITIONS = {
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  SLIDE_UP: 'slide-up',
}

export default {
  components: {
    Container,
    StepCounter,
    SurveyQuestion,
    ProgressBar,
    SurveyButton,
    IconArrowLeft,
  },
  props: {
    userId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      currentQuestion: 1,
      previousAnswers: [],
      transitionName: TRANSITIONS.SLIDE_LEFT,

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
    this.ALTERNATIVES = Object.freeze([...answerAlternatives])
    this.QUESTIONS = Object.freeze([...questions])
    this.TOTAL_STEPS = this.QUESTIONS.length
  },
  methods: {
    setNextQuestion() {
      this.currentQuestion = this.currentQuestion + 1
    },
    setPreviousQuestion() {
      this.currentQuestion = this.currentQuestion - 1
    },
    setPreviousAnswer(pressedAnswerValue) {
      this.previousAnswers.push(pressedAnswerValue)
    },
    sumPersonality() {
      this.personality[this.currentPersonality] += this.previousAnswers[
        this.currentQuestion - 1
      ]
    },
    subtractPersonality() {
      this.personality[this.currentPersonality] -= this.previousAnswers[
        this.currentQuestion - 2
      ]
      this.previousAnswers.pop()
    },
    nextQuestion(pressedAnswerValue) {
      if (this.allQuestionsAnswered) return

      this.transitionName = TRANSITIONS.SLIDE_LEFT
      this.setPreviousAnswer(pressedAnswerValue)
      this.sumPersonality()
      setTimeout(() => this.setNextQuestion(), 350)
    },
    previousQuestion() {
      this.transitionName = TRANSITIONS.SLIDE_RIGHT
      this.subtractPersonality()
      this.setPreviousQuestion()
    },
    async submitSurvey() {
      try {
        await api.post('store-result', { id: this.userId, ...this.personality })

        setTimeout(() => this.$router.push({ name: 'Thanks' }), 1000)
      } catch (error) {
        alert('Something went wrong, try again please.')
        throw Error(error)
      }
    },
  },
  computed: {
    currentPersonality() {
      return this.QUESTIONS[this.currentQuestion - 1].type
    },
    questionText() {
      return (
        this.QUESTIONS[this.currentQuestion - 1] &&
        this.QUESTIONS[this.currentQuestion - 1].question
      )
    },
    hasPreviousQuestion() {
      return this.currentQuestion > 1
    },
    surveyProgress() {
      return calculatePercentage(this.currentQuestion, this.TOTAL_STEPS)
    },
    allQuestionsAnswered() {
      return this.currentQuestion - 1 === this.TOTAL_STEPS
    },
  },
  watch: {
    currentQuestion() {
      if (this.allQuestionsAnswered) {
        this.transitionName = TRANSITIONS.SLIDE_UP
        this.submitSurvey()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

.survey {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;

  .answers-container {
    flex: 1 0 60%;
    padding: rem(50px 0);
    background: $color_primary;
  }

  &__header {
    padding-top: rem(30px);

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: rem(25px);
    }

    button {
      border: 0;
      padding: 0;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      height: rem(40px);
      width: rem(40px);
      transition: background 200ms ease-out, opacity 200ms ease-out;
      cursor: pointer;
      z-index: 1;

      &:focus,
      &:focus-within {
        outline: none;
      }

      &:active {
        background: rgba($color_gray, 0.3);
      }

      &:disabled {
        opacity: 0;
      }
    }

    .step-counter {
      flex: 1;
      display: flex;
      justify-content: center;
      transform: translateX(rem(-20px));
    }
  }
}

$duration: 300ms;
$transition: ease-out;

.slide-left-enter-active,
.slide-left-leave-active,
.slide-up-enter-active,
.slide-up-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity $duration $transition, transform $duration $transition;
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(20%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20%);
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-20%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20%);
}

.slide-up-enter {
  opacity: 0;
  transform: translateY(10%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20%);
}
</style>
