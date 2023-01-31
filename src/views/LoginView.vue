<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserAuthStore } from "@/store/app";

const router = useRouter();
const route = useRoute();
const store = useUserAuthStore();

store.error = "";

const identifier = ref("");
const password = ref("");

const disabled = ref(false);
function validate() {
  store.submitLogin(identifier.value, password.value);
  setTimeout(() => {
    localStorage.removeItem("user")
  }, 2500);
}
</script>

<template>
  <v-card
    title="Login to Herbal Aid"
    max-width="500"
    min-width="360"
    class="mx-auto my-2 pa-2"
  >
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="identifier"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
        ></v-text-field>

        <v-btn
          color="success"
          :class="{ shake: disabled }"
          class="mx-auto mb-5"
          width="100%"
          @click="validate"
        >
          Log In
        </v-btn>
      </v-form>
      <v-fade-transition>
        <v-alert
          v-if="store.error.length"
          type="error"
          v-model="alert"
          width="100%"
          >{{ store.error }}</v-alert
        >
      </v-fade-transition>
    </v-card-text>
  </v-card>
</template>
