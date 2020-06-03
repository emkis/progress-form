import Vue from 'vue'
import VueRouter from 'vue-router'

const SignUp = () => import(/* webpackChunkName: "sign-up" */ '@/pages/SignUp')
const Survey = () => import(/* webpackChunkName: "survey" */ '@/pages/Survey')
const Thanks = () => import(/* webpackChunkName: "thanks" */ '@/pages/Thanks')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/survey/:userId',
    name: 'survey',
    component: Survey,
    props: true,
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: Thanks,
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
