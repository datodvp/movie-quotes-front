import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/i18n'
import router from './router'
import './assets/tailwind.css'
import './config/vee-validate/rules'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
