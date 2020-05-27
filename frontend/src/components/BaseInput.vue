<template>
  <div class="base-input">
    <label class="base-input__label" @click="focusInput">{{ label }}</label>
    <input
      ref="input"
      class="base-input__action"
      @input="updateValue"
      v-bind="$attrs"
      :value="value"
      :aria-label="label"
    />
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

.base-input {
  & + & {
    margin-top: rem(18px);
  }

  &__label {
  }
  &__action {
  }
}
</style>
