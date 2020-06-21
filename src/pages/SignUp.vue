<template>
  <main>
    <Container>
      <Title><span>Hello there!</span> <br />Sing up to the project </Title>

      <form @submit.prevent="handleSubmit">
        <Input label="Name" v-model.trim="name" required />
        <Input label="Email" v-model.trim="email" required />
        <Input label="Phone" v-model.trim="phone" required />
        <Input label="City" v-model.trim="city" required />
        <Input label="FU" maxlength="2" v-model.trim="fu" required />

        <Button type="submit">
          <Loader v-if="isLoading" />
          <template v-else>Submit</template>
        </Button>
      </form>
    </Container>
  </main>
</template>

<script>
import api from '@/services/api'

import Container from '@/components/Container'
import Title from '@/components/Title'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Loader from '@/components/Loader'

export default {
  components: { Container, Title, Input, Button, Loader },
  data() {
    return {
      isLoading: false,

      name: '',
      email: '',
      phone: '',
      city: '',
      fu: '',
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true

      try {
        const response = await api.post('/create-person', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          fu: this.fu,
        })

        const { id } = response.data

        this.$router.push({
          name: 'Survey',
          params: { userId: id },
        })

        this.isLoading = false
      } catch (error) {
        alert('Something went wrong, try again please.')
        this.isLoading = false
        throw Error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
main {
  background: $color_primary;
  padding: rem(60px 0 80px);
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
