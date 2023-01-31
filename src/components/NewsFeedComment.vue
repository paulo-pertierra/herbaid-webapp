<script setup>
import { ref } from "vue";
import formatter from "@/plugins/formatter";
import axios from "axios";

const props = defineProps(["author", "created", "content", "authorId", "commentId", "articleId"]);

const showControls = ref(false);
const credentials = JSON.parse(localStorage.getItem("user"));
if (credentials.user.id === props.authorId) {
  showControls.value = true;
}
const emit = defineEmits(['updateComments'])

function deleteComment() {
  axios.delete(
    "/comments/api::article.article:" +
      props.articleId +
      "/comment/" +
      props.commentId +
      "?authorId=" +
      props.authorId
  )
  emit("updateComments")
}
</script>
<template>
  <v-card class="my-5">
    <v-list-item>
      <v-responsive>
        <v-list-item-subtitle class="ml-1"> </v-list-item-subtitle>
        <v-list-item-subtitle
          >{{ props.author }} &#903; ({{ formatter(props.created) }})
          <v-chip v-if="showControls" class="clickable" @click="deleteComment()"
            >Delete</v-chip
          ></v-list-item-subtitle
        >
      </v-responsive>

      <v-list-item style="font-size: 0.9em">
        {{ props.content }}
      </v-list-item>
    </v-list-item>
  </v-card>
</template>
<style>
.clickable:hover {
  cursor: pointer;
}
</style>
