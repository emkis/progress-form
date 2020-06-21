<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import fullViewportHeightMixin from '@/mixins/fullViewportHeightMixin'

export default {
  mixins: [fullViewportHeightMixin],
}
</script>

<style lang="scss" scoped>
#app::before {
  position: fixed;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color_primary;
  z-index: -1;
}

$duration: 200ms;
$transition: ease-out;

.slide-enter-active,
.slide-leave-active {
  transition: transform $duration $transition;
}

.slide-enter {
  opacity: 0;
  transform: translateX(10%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
