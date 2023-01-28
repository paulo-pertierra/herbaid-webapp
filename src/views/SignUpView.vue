<template>
  
  <v-card
    title="Sign up to Herbal Aid"
    min-width="360"
    width="50vw"
    class="mx-auto my-2 py-2"
  >
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row no-gutters>
          <v-col cols="12" xs="4" md="6">
            <v-text-field
              v-model="firstname"
              label="First Name"
              required
              :error="firstname-error"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="4" md="6">
            <v-text-field
              v-model="lastname"
              label="Last Name"
              required
              :error="lastname-error"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-select
          v-model="gender"
          label="Gender"
          :items="['Male', 'Female', 'Prefer not to say']"
        ></v-select>
        <v-text-field
          v-model="email"
          label="Email"
          type="text"
          required
          :error="email-error"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          :error="password-error"
        ></v-text-field>

        <v-text-field
          v-model="confpassword"
          type="password"
          label="Confirm Password"
          required
          :error="confpassword-error"
        ></v-text-field>

        <v-row>
        <v-btn
          color="success"
          class="mx-auto mb-5 mt-5"
          @click="validate"
          style="width: calc(100% - 20px)"
        >
          Sign Up
        </v-btn>
      </v-row>
      </v-form>
      <v-fade-transition>
        <v-alert type="error" v-model="alert" width="100%">I'm an error alert.</v-alert>
      </v-fade-transition>
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
import { ref } from "vue";
const firstname = ref("");
const lastname = ref("");
const gender = ref(null);
const email = ref("");
const password = ref("");
const confpassword = ref("");

const alert = ref(false)

function validate() {
  console.log(alert.value)
  alert.value = true
  setTimeout(()=> {
    alert.value = false
  }, 2500)
}
</script>
