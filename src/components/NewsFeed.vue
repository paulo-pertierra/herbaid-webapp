<script setup>
import { ref, onMounted } from 'vue';
import NewsFeedEntry from './NewsFeedEntry.vue';
import { useArticleStore } from '@/store/app';
const store = useArticleStore();

onMounted(()=> {
  store.getArticles()
})
</script>
<template>
  <h1 class="text-center my-5">News Feed</h1>
  <NewsFeedEntry 
    v-for="article in store.articles"
    :key="article.id"
    :title="article.attributes.title"
    :author="article.attributes.author"
    :created="article.attributes.createdAt"
    :content="article.attributes.content"
  />
</template>