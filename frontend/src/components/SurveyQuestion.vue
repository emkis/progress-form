<template>
  <h2 class="survey-question">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

.survey-question {
  font-size: rem(24px);
  line-height: 1.4;
  font-weight: 300;
  padding: rem(30px 0);
  color: black;

  @media (min-width: 768px) {
    font-size: rem(30px);
  }
}
</style>
