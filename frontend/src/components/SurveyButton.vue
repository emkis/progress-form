<template>
  <button
    class="survey-button"
    :class="{ pressed }"
    v-on="$listeners"
    @click="pressed = true"
  >
    <span class="survey-button__option"><slot name="option"/></span>
    <slot name="answer" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      pressed: false,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

.survey-button {
  position: relative;
  display: block;
  width: 100%;
  border: 0;
  box-shadow: none;
  text-align: left;
  min-height: rem(65px);
  padding: rem(0 30px);
  color: white;
  background: $color_primary_faded;
  transition: opacity 200ms ease-in, transform 100ms ease-in;
  cursor: pointer;
  z-index: 10;

  & + & {
    margin-top: rem(13px);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }

  &.pressed {
    color: $color_primary;

    &::after {
      transform: scaleX(1);
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: white;
    z-index: -1;
  }

  &::after {
    width: 100%;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 200ms ease-out;
  }

  &__option {
    font-weight: 300;
    margin-right: rem(25px);
  }
}
</style>
