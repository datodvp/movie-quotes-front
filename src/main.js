import './assets/main.css'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/tailwind.css'
import './config/vee-validate/rules'

// console.log(process.config())
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
