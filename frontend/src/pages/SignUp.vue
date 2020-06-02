<template>
  <main>
    <Container>
      <Title><span>Hello there!</span> <br />Sing up to the project </Title>

      <form @submit.prevent="handleSubmit">
        <Input label="Name" v-model.trim="name" />
        <Input label="Email" v-model.trim="email" />
        <Input label="Phone" v-model.trim="phone" />
        <Input label="City" v-model.trim="city" />
        <Input label="FU" maxlength="2" v-model.trim="fu" />

        <Button type="submit">Submit</Button>
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

export default {
  components: { Container, Title, Input, Button },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      city: '',
      fu: '',
    }
  },
  methods: {
    async handleSubmit() {
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
          name: 'survey',
          params: { personId: id },
        })
      } catch (error) {
        throw Error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/constants/index.scss';

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
