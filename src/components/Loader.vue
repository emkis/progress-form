<template>
  <IconLoader size="30" color="#0e45fd" />
</template>

<script>
import { IconLoader } from '@/components/icons'

export default {
  components: {
    IconLoader,
  },
}
</script>

<style lang="scss" scoped>
svg {
  margin-right: 0 !important;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
