<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const firstname = ref("");
const lastname = ref("");
const gender = ref("Prefer not to say");
const username = ref("");
const email = ref("");
const password = ref("");
const confPassword = ref("");

const usernameError = ref(false);
const firstnameError = ref(false);
const lastnameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const confPasswordError = ref(false);

const alert = ref(false);

function validate() {
  if (!username.value.length) {
    Swal.fire({
      title: "Username",
      text: "Please type in your username!",
      icon: "error",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (username.value.length < 4) {
    Swal.fire({
      title: "Username",
      text: "Your username is too short!",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (username.value.length > 32) {
    Swal.fire({
      title: "Username",
      text: "Your username is too long!",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (!password.value.length) {
    Swal.fire({
      title: "Password",
      text: "Please enter your password.",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (password.value.length < 4) {
    Swal.fire({
      title: "Password",
      text: "Your password is too short!",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (password.value.length > 64) {
    Swal.fire({
      title: "Password",
      text: "Your password is too long!",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (!firstname.value.length || !lastname.value.length) {
    Swal.fire({
      title: "Introduce Yourself",
      text: "Please complete your name",
      icon: "warning",
      showCancelButton: false,
      showDenyButton: false,
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  } else if (password.value.length !== confPassword.value.length) {
  } else {
    submitInfo();
  }
}

function submitInfo() {
  axios
    .post("/auth/local/register", {
      username: username.value,
      password: password.value,
      email: email.value,
      first_name: firstname.value,
      last_name: lastname.value,
      gender: gender.value,
    })
    .then((response) => {
      console.log(response.data);
      router.push({ name: "Home" });
      Swal.fire({
        title: "Success!",
        text: "You can now log in.",
        icon: "success",
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Something went wrong",
        text: "There's a problem with the server.",
        icon: "error",
        showCancelButton: false,
        showDenyButton: false,
        showConfirmButton: false,
      });
      setTimeout(() => {
      Swal.close();
    }, 1000);
    });
}
</script>
<template>
  <v-card
    title="Sign up to Herbal Aid"
    min-width="360"
    width="50vw"
    class="mx-auto my-2 py-2"
  >
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="username"
          label="Username"
          type="username"
          required
          :error="usernameError"
        ></v-text-field>
        <v-row no-gutters>
          <v-col cols="12" xs="4" md="6">
            <v-text-field
              v-model="firstname"
              label="First Name"
              type="firstname"
              required
              :error="firstnameError"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="4" md="6">
            <v-text-field
              v-model="lastname"
              label="Last Name"
              type="lastname"
              required
              :error="lastnameError"
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
          type="email"
          required
          :error="emailError"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          required
          :error="passwordError"
        ></v-text-field>

        <v-text-field
          v-model="confPassword"
          type="password"
          label="Confirm Password"
          required
          :error="confPasswordError"
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
    </v-card-text>
  </v-card>
</template>

<style>
.swal2-container {
  z-index: 99999;
}
</style>
