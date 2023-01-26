<template>
      <v-card title="Login" max-width="500" min-width="360" class="mx-auto">
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" label="Name" required></v-text-field>

            <v-text-field v-model="email" label="E-mail" required></v-text-field>

            <v-text-field v-model="password" label="Password" required></v-text-field>

            <v-btn color="success" class="mx-auto mb-5" width="100%" @click="validate">
              Log In
            </v-btn>

          </v-form>
        </v-card-text>
        <!-- <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" @click="loginDialog = false">
                Close
              </v-btn>
              <v-btn variant="text" @click="login">
                Log In
              </v-btn>
            </v-card-actions> -->
      </v-card>

</template>
<script setup>
import { ref } from 'vue';
const name = ref('')
const email = ref('')
const password = ref('')

</script>