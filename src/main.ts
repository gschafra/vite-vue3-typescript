import Lara from '@primeuix/themes/lara'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'


const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Lara
    }
})
app.use(router)
app.mount('#app')

