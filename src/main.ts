import Lara from '@primevue/themes/lara'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
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
app.component('Dialog', Dialog)
app.component('Button', Button)
app.mount('#app')

