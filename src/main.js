/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = import.meta.env.VITE_API
const app = createApp(App)
registerPlugins(app)

app.use(VueAxios, axios)
app.mount('#app')
