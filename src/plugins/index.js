/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import router from '../router'
export function registerPlugins (app) {
  loadFonts()
  pinia
    .use(piniaPluginPersistedState)
  app
    .use(vuetify)
    .use(pinia)
    .use(router)
}
