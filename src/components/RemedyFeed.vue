<script setup>
import RemedyEntry from "./RemedyEntry.vue";
import RemedyQueried from "./RemedyQueried.vue";
import Swal from 'sweetalert2'
import { ref, watch } from "vue";

import { useRemedyStore } from "@/store/app";
const store = useRemedyStore();

store.getRemedies();
const loading = ref(true)

const currentPage = ref();
watch(currentPage, (newPage) => {
  store.currentPage = newPage;
  store.getRemedies();
});

const querystr = ref();


watch(querystr, (newValue) => {
  if (!newValue.length) {
    store.showAllRemedies = true;
  } else {
    store.querystring = newValue;
    console.log(store.querystring);
    loading.value = false;
  }
});
watch(store, ()=> {
  loading.value = false
})
</script>

<template>
  <h1 class="text-center my-5">Remedies Feed</h1>
  <!-- <input type="text" v-model="querystr" /><button
    class="sortbutton"
    @click="store.getQueriedRemedies()"
  >
    Search
  </button> -->
  <div class="search">
    <v-text-field
      rounded
      v-model="querystr"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      @keyup.enter="store.getQueriedRemedies()"
    ></v-text-field>
  </div>

  <div v-if="loading" class="d-flex justify-center my-5">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
  <div v-else-if="store.showAllRemedies">
    <RemedyEntry
      v-for="remedy in store.remedies"
      :name="remedy.attributes.name"
      :content="remedy.attributes.content"
      :carousel="remedy.attributes.carousel.data"
    />
    <v-pagination
    v-model="currentPage"
    :length="store.pageCount"
    circle
  ></v-pagination>
  </div>
  <div v-else>
    <RemedyQueried
      v-for="remedy in store.queriedremedies"
      :name="remedy.name"
      :content="remedy.content"
      :id="remedy.id"
    />
  </div>
</template>

<style scoped>
.search {
  width: 1100px;
  margin: auto;
}
</style>