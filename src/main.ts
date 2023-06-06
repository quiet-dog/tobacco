import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index";
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(pinia).use(router).mount('#app')

// window.onload = function () {
   

// }
