<script setup>
import { defineProps } from 'vue';
import formatter from '@/plugins/formatter';
const props = defineProps(['title', 'author', 'created', 'content'])
</script>

<template>
  <v-responsive class="border mx-auto my-16 article" max-width="1100">
    <div class="d-flex py-3 justify-space-between">
      <v-responsive>
        <h1>{{ title }}</h1>
        <div class="d-flex justify-space-between">
          <div>{{ author }}</div>
          <div class="text-right">{{ formatter(created) }}</div>
        </div>
      </v-responsive>
    </div>
    <hr class="my-1" />
    <div class="content" v-html="content"></div>

    <!-- Comments Section -->
  </v-responsive>
</template>

<style scoped>
.article {
  padding: 40px;
}
.article h1 {
  font-size: xx-large;
  line-height: 1em;
  margin: 0em 0em 0.75em 0em;
}
.content {
  margin-top: 0px;
}
.content :deep(h1) {
  line-height: 2em;
  font-size: x-large;
}
.content :deep(h2) {
  line-height: 3em;
  font-size: large;
}
.content :deep(h3) {
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: large;
}
.content :deep(h4) {
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: large;
}
.content :deep(ul) {
  margin-left: 3em;
}
.content :deep(p) {
  line-height: 1.5em;
}
@media screen and (max-width: 600px) {
  .article {
    padding: 20px;
  }
  .content {
    padding: 0px;
  }
}
</style>
