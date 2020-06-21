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
.progress-bar {
  overflow: hidden;

  &__total {
    background: $color_primary;
  }

  &__percentage {
    height: rem(7px);
    background: $color_greyish_blue;
    transition: transform 200ms ease-out;
  }
}
</style>
