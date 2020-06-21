<template>
  <main>
    <Container>
      <Title><span>Yessss,</span> <br />you’ve completed your survey.</Title>
      <Button @click="backToInitial">Back to sign up</Button>
    </Container>
  </main>
</template>

<script>
import Container from '@/components/Container'
import Title from '@/components/Title'
import Button from '@/components/Button'

export default {
  components: { Container, Title, Button },
  methods: {
    backToInitial() {
      this.$router.push({ name: 'SignUp' })
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background: $color_primary;
  padding: rem(150px 0 80px);
  min-height: 100%;

  .title {
    margin-bottom: rem(40px);

    > span {
      font-weight: 500;
    }
  }

  .button {
    margin-top: rem(35px);
  }
}
</style>
