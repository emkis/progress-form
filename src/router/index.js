import Vue from 'vue'
import VueRouter from 'vue-router'

const SignUp = () => import(/* webpackChunkName: "sign-up" */ '@/pages/SignUp')
const Survey = () => import(/* webpackChunkName: "survey" */ '@/pages/Survey')
const Thanks = () => import(/* webpackChunkName: "thanks" */ '@/pages/Thanks')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/survey/:userId',
    name: 'Survey',
    component: Survey,
    props: true,
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks,
  },
  {
    path: '*',
    redirect: { name: 'SignUp' },
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
