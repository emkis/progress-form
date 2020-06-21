<template>
  <div class="step-counter">
    <strong>
      <span class="step-counter__current">{{ currentStep }}</span>
      <span class="step-counter__separator">/</span>
      <span class="step-counter__total">{{ totalSteps }}</span>
    </strong>
  </div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.step-counter {
  user-select: none;

  &__current {
    font-size: rem(22px);
    font-weight: 700;
    color: black;
  }

  &__separator {
    margin: 0 4px;
    font-weight: 500;
    color: $color_gray;
  }

  &__total {
    font-size: rem(15px);
    font-weight: 500;
    color: $color_gray;
  }
}
</style>
