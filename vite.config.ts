import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import Components from 'unplugin-vue-components/vite'
import {PrimeVueResolver} from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    }),
    eslintPlugin()
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})
