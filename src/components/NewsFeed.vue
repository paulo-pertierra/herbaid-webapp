<script setup>
import { ref, watch, onMounted } from 'vue';
import NewsFeedEntry from './NewsFeedEntry.vue';
import { useArticleStore, useLocaleStore } from '@/store/app';

const store = useArticleStore();
const i18n = useLocaleStore();
i18n.getLocales()

store.getArticles("en")
onMounted(()=> {
  store.loading = true;
})

const currentPage = ref()
watch(currentPage, (newPage) => {
  store.currentPage = newPage;
  store.getArticles(i18n.locale)
  store.loading = true;
});

watch(store, ()=> {
  window.scrollTo(0,0);
})

watch(i18n, ()=> {
  store.getArticles(i18n.locale)
  console.log("change")
})
</script>
<template>
  <h1 class="text-center my-5">News Feed</h1>
  <div v-if="store.loading" class="d-flex justify-center my-5">
    <v-progress-circular indeterminate :color="'green'"></v-progress-circular>
  </div>
  <div v-else>
    <v-pagination
        v-model="currentPage"
        :length="store.pageCount"
        circle
      ></v-pagination>
    <NewsFeedEntry
      v-for="article in store.articles"
      :key="article.id"
      :id="article.id"
      :title="article.attributes.title"
      :author="article.attributes.author"
      :created="article.attributes.createdAt"
      :content="article.attributes.content"
    />
    <v-pagination
        v-model="currentPage"
        :length="store.pageCount"
        circle
      ></v-pagination>
  </div>
</template>