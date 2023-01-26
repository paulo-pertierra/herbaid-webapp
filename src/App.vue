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
    <NavigationPanel />
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
import NavigationPanel from './views/NavigationPanel.vue'
// START Theming
const theme = ref('light')
const color = ref('green')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  color.value = color.value === 'green' ? '#02601e' : 'green'
}
// END Theming

//START Login Form
const loginDialog = ref(false)
//END Login Form

</script>

