import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App).use(router).mount('#app')
