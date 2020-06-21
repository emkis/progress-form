<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.title {
  font-size: rem(40px);
  line-height: 1.25;
  font-weight: 300;
  color: white;

  @media (min-width: 768px) {
    font-size: rem(55px);
  }
}
</style>
