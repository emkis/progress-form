import Vue from 'vue'
import VueRouter from 'vue-router'

const SignUp = () =>
  import(/* webpackChunkName: "sign-up" */ '@/pages/SignUp.vue')

const Survey = () =>
  import(/* webpackChunkName: "survey" */ '@/pages/Survey.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/survey/:id',
    name: 'survey',
    component: Survey,
    props: true,
  },
  {
    path: '*',
    redirect: { name: 'sign-up' },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
