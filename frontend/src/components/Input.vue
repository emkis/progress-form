<template>
  <div class="input">
    <label class="input__label" @click="focusInput">{{ label }}</label>
    <div class="input__wapper">
      <input
        ref="input"
        class="input__action"
        @input="updateValue"
        v-bind="$attrs"
        :value="value"
        :aria-label="label"
      />
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: [String, Number],
  },
  methods: {
    updateValue({ target }) {
      this.$emit('input', target.value)
    },
    focusInput() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

.input {
  width: 100%;

  & + & {
    margin-top: rem(25px);
  }

  &__label {
    display: block;
    font-size: rem(18px);
    line-height: 1.5;
    font-weight: 500;
    margin-bottom: rem(6px);
    color: white;
  }

  &__wapper {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
      background: white;
      z-index: 1;
    }
  }

  &__action {
    width: 100%;
    min-height: rem(60px);
    padding: rem(18px 20px);
    box-shadow: none;
    color: white;
    border: 2px solid transparent;
    background: $color_primary_faded;
    transition: border 200ms ease-out;

    &:focus,
    &:active {
      outline: none;
      border-color: white;
    }
  }
}
</style>
