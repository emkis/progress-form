<template>
  <h2 class="survey-question">
    <slot />
  </h2>
</template>

<style lang="scss" scoped>
.survey-question {
  font-size: rem(26px);
  line-height: 1.5;
  font-weight: 300;
  padding: rem(30px 0 35px);
  color: black;

  @media (min-width: 768px) {
    font-size: rem(30px);
  }
}
</style>
