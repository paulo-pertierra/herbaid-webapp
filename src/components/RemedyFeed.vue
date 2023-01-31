<script setup>
import { ref, watch, onMounted } from "vue";

import RemedyEntry from "./RemedyEntry.vue";
import RemedyQueried from "./RemedyQueried.vue";

import { useLocaleStore, useThemeStore } from "@/store/app";
import { useRemedyStore } from "@/store/app";

const i18n = useLocaleStore()
const theme = useThemeStore();
const store = useRemedyStore();

//OnMounted
onMounted(() => {
  store.getRemedies(i18n.locale);
  currentPage.value = store.currentPage;
});

//Pagination ugly fix, I have to know how to get Pinia
//state keys instead of the entire state. 🤮
const currentPage = ref();
watch(currentPage, (newPage) => {
  store.loading = true;
  store.currentPage = newPage;
  store.getRemedies(i18n.locale);
  window.scrollTo(0, 0);
});

//Not so elegant search box function using Pinia
watch(store, () => {
  if (!store.querystring.length) {
    store.showAllRemedies = true;
  } else {
    store.loading = false;
    window.scrollTo(0, 0);
  }
});
watch(i18n, ()=> {
  store.getRemedies(i18n.locale)
  store.currentPage = 1;
  currentPage.value = 1;
})
</script>

<template>
  <h1 class="text-center my-5">Remedies Feed</h1>
  <div class="search">
    <v-text-field
      rounded
      v-model="store.querystring"
      label="Search"
      single-line
      hide-details
      @keyup.enter="store.getQueriedRemedies(i18n.locale)"
    ></v-text-field>
  </div>

  <div v-if="store.loading" class="d-flex justify-center my-5 mt-16">
    <v-progress-circular indeterminate :color="'green'"></v-progress-circular>
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
    <div v-if="store.queryLoading" class="d-flex justify-center my-5 mt-16">
      <v-progress-circular indeterminate :color="'green'"></v-progress-circular>
    </div>
    <div v-else>
      <RemedyQueried
        v-for="remedy in store.queriedremedies"
        :name="remedy.name"
        :content="remedy.content"
        :id="remedy.id"
      />
    </div>
  </div>
</template>

<style scoped>
.search {
  width: 1100px;
  margin: auto;
}
</style>
