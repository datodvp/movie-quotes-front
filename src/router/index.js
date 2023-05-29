import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignUp from '../components/Auth/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'sign-up',
          component: SignUp
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
