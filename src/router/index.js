import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import SignUp from '../components/Auth/SignUp.vue'
import TheLogin from '../components/Auth/TheLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children: [
        {
          path: 'sign-up',
          component: SignUp
        },
        {
          path: 'login',
          component: TheLogin
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
