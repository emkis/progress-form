<template>
  <div class="progress-bar">
    <div class="progress-bar__total">
      <div
        class="progress-bar__percentage"
        :style="{ transform: 'translateX(' + percentage + '%)' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: [Number, String],
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

.progress-bar {
  overflow: hidden;
  padding: rem(15px 0);

  &__total {
    background: $color_primary;
  }

  &__percentage {
    height: rem(6px);
    background: $color_gray;
    transition: transform 200ms ease-out;
  }
}
</style>
