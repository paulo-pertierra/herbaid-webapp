<template>
  <v-app :theme="theme">
    <v-app-bar elevation="2" :color="color">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Herbal Aid</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn prepend-icon="mdi-account" @click="loginDialog = true">Login
        <v-dialog v-model="loginDialog">
          <LoginView />
        </v-dialog>
    </v-btn>
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="onClick">
        Theme</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-post</v-icon>
              <RouterLink style="text-decoration: none; color: inherit; font-size: 1.2em;" to="/">News Feed</RouterLink>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-sprout</v-icon>
              <RouterLink style="text-decoration: none; color: inherit; font-size: 1.2em;" to="/remedies">Remedies Directory</RouterLink>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-doctor</v-icon>
              <RouterLink style="text-decoration: none; color: inherit; font-size: 1.2em;" to="/doctors">Doctors Directory</RouterLink>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-information</v-icon>
              <RouterLink style="text-decoration: none; color: inherit; font-size: 1.2em;" to="/about">About Us</RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, watch } from 'vue'
import LoginView from './views/LoginView.vue';

// START Theming
const theme = ref('light')
const color = ref('green')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  color.value = color.value === 'green' ? '#02601e' : 'green'
}
// END Theming

//START Navigation Bar
const drawer = ref(false)
const group = ref(null)

watch((group) => {
  drawer.value = false
})
//END Navigation Bar

//START Login Form
const loginDialog = ref(false)
//END Login Form

</script>

