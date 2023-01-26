<template>
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
</template>

<script setup>
import { ref, watch } from 'vue';
//START Navigation Bar
const drawer = ref(false)
const group = ref(null)

watch((group) => {
  drawer.value = false
})
//END Navigation Bar
</script>