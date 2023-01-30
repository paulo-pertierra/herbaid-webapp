<script setup>
import { ref } from 'vue';
import formatter from '@/plugins/formatter';
import axios from 'axios';

const props = defineProps(['author', 'created', 'content', 'id'])

const comment = ref("")
function postComment() {
  axios.post("/comments/api::article.article:" + props.id+ "", {
    content: comment.value
  })
}
</script>

<template>
      <v-card class="my-5">
      <v-list-item>
        <v-responsive>
          <v-list-item-subtitle class="ml-1"> </v-list-item-subtitle>
          <v-list-item-subtitle>{{ props.author }} &#903; ({{ formatter(props.created) }})</v-list-item-subtitle>
        </v-responsive>

        <v-list-item style="font-size: .9em;">
          {{ props.content }}
        </v-list-item>
      </v-list-item>
    </v-card>
</template>