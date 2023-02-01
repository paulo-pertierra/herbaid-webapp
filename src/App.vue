<script setup>
import { ref, watch } from "vue";

import LoginView from "./views/LoginView.vue";
import SignupView from "./views/SignUpView.vue";

import { useThemeStore } from "./store/app"; //I wanted a persisted theme
import { useUserAuthStore, useLocaleStore } from "./store/app";
import store from "./store";
//START User session
const user = useUserAuthStore();
const loggedin = ref(false);
const credentials = JSON.parse(localStorage.getItem("user"))
const i18n = useLocaleStore();
i18n.getLocales()
try { //I feel dirty
if (credentials.user.bearer.length) {
  loggedin.value = true;
}
} catch {
  loggedin.value = false
}
//END User Session
//START Theming
const theme = useThemeStore();
function changeTheme() {
  theme.changeTheme();
  console.log(theme.mode);
  console.log(theme.color);
}
//END Theming

//START Login Form
const loginDialog = ref(false);
const signupDialog = ref(false);
//END Login Form

//START Navigation Bar
const drawer = ref(false);
const group = ref(null);

watch((group) => {
  drawer.value = false;
});
//END Navigation Bar

//START Footer
const icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin"];
//END Footer


//START Locale

//END Locale
</script>

<template>
  <v-app :theme="theme.mode">
    <v-app-bar elevation="2" :color="theme.color" absolute>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="d-none d-sm-flex"
        ><h3>Herbal Aid</h3></v-app-bar-title
      >
      <v-spacer></v-spacer>
      <div v-if="!loggedin">
        <v-btn prepend-icon="mdi-account" @click="loginDialog = true"
          >Login
          <v-dialog v-model="loginDialog">
            <LoginView />
          </v-dialog>
        </v-btn>
        <v-btn prepend-icon="mdi-account-star" @click="signupDialog = true"
          >Sign Up
          <v-dialog v-model="signupDialog">
            <SignupView />
          </v-dialog>
        </v-btn>
      </div>
      <div v-else>
        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn :color="theme.mode" v-bind="props"
              ><v-icon size="x-large">mdi-account-circle</v-icon></v-btn
            >
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="clickable" @click="user.userLogout()"
                >Log Out</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn
        :prepend-icon="
          theme.mode === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        "
        @click="changeTheme()"
      >
        <div class="d-none d-sm-flex">Theme</div>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-post</v-icon>
              <RouterLink
                style="text-decoration: none; color: inherit; font-size: 1.2em"
                to="/"
                >News Feed</RouterLink
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-sprout</v-icon>
              <RouterLink
                style="text-decoration: none; color: inherit; font-size: 1.2em"
                to="/remedies"
                >Remedies Directory</RouterLink
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-doctor</v-icon>
              <RouterLink
                style="text-decoration: none; color: inherit; font-size: 1.2em"
                to="/doctors"
                >Doctors Directory</RouterLink
              >
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>
              <v-icon class="mr-2">mdi-information</v-icon>
              <RouterLink
                style="text-decoration: none; color: inherit; font-size: 1.2em"
                to="/about"
                >About Us
              </RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <div class="d-flex justify-content">
          <h3 class="mx-auto">Languages</h3>
        </div>
        <div class="d-flex justify-center">
          <v-btn class="mx-4 my-4" v-for="locale in i18n.locales" @click="i18n.changeLocale(locale.code)">
            {{ locale.name }}
          </v-btn>
        </div>
        <router-view />
      </v-container>
    </v-main>

    <v-footer dark padless :color="theme.color" class="d-flex justify-center">
      <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
        :color="theme.color"
      >
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            :color="theme.color"
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Made with love and Vue by Universidad de Dagupan
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Herbal Aid</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style>
.clickable:hover {
  cursor: pointer;
}
.swal2-container {
  position: absolute;
  z-index: 99999;
}
</style>
