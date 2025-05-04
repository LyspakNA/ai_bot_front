import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/CreateBirthday',
    name: 'createBirthday',
    component: () => import('../components/CreateBirthday.vue')
  },
  {
    path: '/Registration',
    name: 'registration',
    component: () => import('../components/Registration.vue')
  },
  {
    path: '/CustomMessage',
    name: 'customMessage',
    component: () => import('../components/CustomMessage.vue')
  },
  {
    path: '/EditUser',
    name: 'editUser',
    component: () => import('../components/EditUser.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
