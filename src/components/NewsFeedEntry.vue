<script setup>
import { ref, reactive, watch } from "vue";
import formatter from "@/plugins/formatter";
import NewsFeedComment from "./NewsFeedComment.vue";
import axios from "axios";
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
//START User Session
const loggedin = ref(false);
const credentials = JSON.parse(localStorage.getItem("user"));
try {
  //I feel dirty again
  if (credentials.user.bearer.length) {
    loggedin.value = true;
  }
} catch {
  loggedin.value = false;
}
//END User Session

const props = defineProps(["title", "id", "author", "created", "content"]);
const comments = ref();

function getComment() {
  axios
  .get("/comments/api::article.article:" + props.id + "/flat")
  .then((response) => {
    comments.value = response.data.data;
  });
}
const displayComments = reactive({
  text: "Show",
  mode: false,
});

function toggleComments() {
  displayComments.text = displayComments.text === "Hide" ? "Show" : "Hide";
  displayComments.mode = displayComments.mode === true ? false : true;
}


const usercomment = ref("");
function postComment() {
  axios.post("/comments/api::article.article:" + props.id + "", {
    content: usercomment.value,
  }).then(()=> {
    getComment()
  });
  usercomment.value = "";
}
getComment()
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

    <div v-if="loggedin">
      <h3 class="my-3">
        Comments:
        <v-btn @click="toggleComments()">{{ displayComments.text }}</v-btn>
      </h3>
      <!-- Comments Section -->
      <NewsFeedComment
        @update-comments="getComment(), getComment(), getComment()"
        v-if="displayComments.mode"
        v-for="(comment, index) in comments"
        :article-id="props.id"
        :author="comment.author.name"
        :author-id="comment.author.id"
        :comment-id="comment.id"
        :created="comment.createdAt"
        :content="comment.content"
      />
      <v-responsive v-if="displayComments.mode">
        <div class="d-flex justify-space-between">
          <v-text-field
            v-model="usercomment"
            label="Comment Here"
            variant="outlined"
            class="my-2"
          ></v-text-field>
          <v-card-actions
            ><v-btn
              class="mb-2 mt-n4 d-flex mr-auto"
              color="green"
              prepend-icon="mdi-comment"
              variant="outlined"
              height="56"
              @click="postComment()"
              >Submit</v-btn
            ></v-card-actions
          >
        </div>
      </v-responsive>
    </div>
    <div class="mt-5 mx-auto text-center" v-else>
      <h3>Log in to view and add comments!</h3>
    </div>
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
