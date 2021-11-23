import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/globalStyle.css'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';


createApp(App).use(router).use(VueToast).mount('#app')
