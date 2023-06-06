import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import SignUp from '../components/Auth/SignUp.vue'
import TheLogin from '../components/Auth/TheLogin.vue'
import ForgotPassword from '@/components/Auth/ForgotPassword.vue'
import ResetPassword from '@/components/Auth/ResetPassword.vue'
import MailSentNofitication from '@/components/Auth/MailSentNotification.vue'
import MailVerified from '@/components/Auth/MailVerified.vue'
import PasswordResetSent from '@/components/Auth/PasswordResetSent.vue'
import PasswordUpdated from '@/components/Auth/PasswordUpdated.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      beforeEnter() {
        const authStore = useAuthStore()
        console.log(authStore.getIsAuthenticated)
        if (authStore.getIsAuthenticated) {
          return { name: 'home' }
        }
      },
      children: [
        {
          path: 'sign-up',
          name: 'signUp',
          component: SignUp
        },
        {
          path: 'mail-sent',
          name: 'mailSent',
          component: MailSentNofitication
        },
        {
          path: 'mail-verified',
          name: 'mailVerified',
          component: MailVerified
        },
        {
          path: 'login',
          name: 'login',
          component: TheLogin
        },
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          component: ForgotPassword
        },
        {
          path: 'reset-password',
          name: 'resetPassword',
          component: ResetPassword
        },
        {
          path: 'password-reset-sent',
          name: 'passwordResetSent',
          component: PasswordResetSent
        },
        {
          path: 'password-updated',
          name: 'passwordUpdated',
          component: PasswordUpdated
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter() {
        const authStore = useAuthStore()
        if (!authStore.getIsAuthenticated) {
          return { name: 'landing' }
        }
      }
    }
  ]
})

export default router
