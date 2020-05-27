<template>
  <div class="base-select-input">
    <label class="base-select-input__label" @click="focusInput">
      {{ label }}
    </label>

    <select
      ref="input"
      class="base-select-input__action"
      @input="updateValue"
      v-bind="$attrs"
      :value="value"
      :aria-label="label"
    >
      <option
        v-for="(option, index) in options"
        :key="option"
        :value="index"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
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
    options: {
      type: Array,
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

.base-select-input {
  & + & {
    margin-top: rem(18px);
  }

  &__label {
  }
  &__action {
  }
}
</style>
