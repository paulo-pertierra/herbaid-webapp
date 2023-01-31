<script setup>
import { ref, watch, onMounted } from "vue";
import { useDoctorStore } from "@/store/app";

const store = useDoctorStore();

store.getDoctors();

const currentPage = ref()
watch(currentPage, (newPage) => {
  store.currentPage = newPage;
  store.getDoctors()
  store.loading = true;
});

</script>
<template>
  <h1 class="text-center my-5">Doctors Directory</h1>
  <div class="d-flex justify-center mt-15" v-if="store.loading">
    <v-progress-circular indeterminate :color="'green'"></v-progress-circular>
  </div>
  <v-container v-else fluid class="mx-auto">
    <div v-for="doctor in store.doctors">
      <v-card
        border
        class="mx-auto my-10 mt-0"
        density="compact"
        :prepend-avatar="doctor.attributes.display_photo.data.attributes.url"
        :subtitle="doctor.attributes.field"
        :title="doctor.attributes.name"
        variant="text"
        max-width="650"
        min-width="350"
      >
        <v-card-text> {{ doctor.attributes.description }}</v-card-text>
      </v-card>
    </div>
    <v-pagination
    v-model="currentPage"
    :length="store.pageCount"
    circle
  ></v-pagination>
  </v-container>

</template>
