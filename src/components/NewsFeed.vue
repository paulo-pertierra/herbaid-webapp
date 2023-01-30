<script setup>
import { ref, watch, onMounted } from 'vue';
import NewsFeedEntry from './NewsFeedEntry.vue';
import { useArticleStore } from '@/store/app';
const store = useArticleStore();

onMounted(()=> {
  store.getArticles()
})

const currentPage = ref()
watch(currentPage, (newPage) => {
  store.currentPage = newPage;
  store.getArticles()
});

watch(store, ()=> {
  window.scrollTo(0,0);
})
</script>
<template>
  <h1 class="text-center my-5">News Feed</h1>
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
</template>