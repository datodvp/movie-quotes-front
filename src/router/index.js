import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import AboutView from '../views/AboutView.vue'
import SignUp from '../components/Auth/SignUp.vue'
import TheLogin from '../components/Auth/TheLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/about',
      name: 'about',
      component: () => AboutView
    }
  ]
})

export default router
