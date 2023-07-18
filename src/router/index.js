import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/Landing/LandingView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import SignUp from '@/components/Auth/SignUp.vue'
import TheLogin from '@/components/Auth/TheLogin.vue'
import ForgotPassword from '@/components/Auth/ForgotPassword.vue'
import ResetPassword from '@/components/Auth/ResetPassword.vue'
import MailSentNofitication from '@/components/Auth/MailSentNotification.vue'
import MailVerified from '@/components/Auth/MailVerified.vue'
import PasswordResetSent from '@/components/Auth/PasswordResetSent.vue'
import PasswordUpdated from '@/components/Auth/PasswordUpdated.vue'
import { useAuthStore } from '@/stores/auth'
import NewsFeed from '@/views/Home/Pages/NewsFeed.vue'
import ListOfMovies from '@/views/Home/Pages/ListOfMovies.vue'
import TheProfile from '@/views/Home/Pages/TheProfile.vue'
import TheMovie from '@/views/Home/Pages/TheMovie.vue'
import TheQuote from '@/views/Home/Pages/TheQuote.vue'
import ForbiddenView from '@/views/Forbidden/ForbiddenView.vue'
import NotFound from '@/views/NotFound/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      beforeEnter() {
        const authStore = useAuthStore()
        if (authStore.getIsAuthenticated) {
          return { name: 'newsFeed' }
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
      path: '/user',
      name: 'home',
      component: HomeView,
      beforeEnter() {
        const authStore = useAuthStore()
        if (!authStore.getIsAuthenticated) {
          return { name: 'landing' }
        }
      },
      children: [
        {
          path: '',
          name: 'profile',
          component: TheProfile
        },
        {
          path: 'news-feed',
          name: 'newsFeed',
          component: NewsFeed
        },
        {
          path: 'movies-list',
          name: 'moviesList',
          component: ListOfMovies
        },
        {
          path: 'movie/:id',
          name: 'moviePage',
          component: TheMovie
        },
        {
          path: 'quote/:id',
          name: 'quotePage',
          component: TheQuote
        }
      ]
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})

export default router
