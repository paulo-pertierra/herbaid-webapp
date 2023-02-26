/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import '@/assets/base.css'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import VueAxios from 'vue-axios'

const user = JSON.parse(localStorage.getItem('user'))
axios.defaults.baseURL = import.meta.env.VITE_API
try {
axios.defaults.headers.common['Authorization'] = `Bearer ${user.user.bearer}`;
} catch {
  
}
const app = createApp(App)
registerPlugins(app)

app.use(VueAxios, axios)
app.mount('#app')