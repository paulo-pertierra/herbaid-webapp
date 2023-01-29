<script setup>
import { defineProps } from 'vue';
const data = {
  title: "Herbal Aid's First Beta Release",
  content: '<h1>🎉 Welcome Everyone! 🎉</h1><p>This is Herbal Aid\'s maiden official beta release deployment. This is a test to check if data can be persisted in a system, time to test! This is a huge thing for all of us and I hope that this project stays maintained properly!</p><h1>BUT FIRST!</h1><p style="text-align:center;"><img class="image_resized" style="width:100%;" src="https://res.cloudinary.com/dyfvwmpc8/image/upload/v1673518925/thinking_person_d3d49665bb.jpg" alt="thinking-person.jpg" srcset="https://res.cloudinary.com/dyfvwmpc8/image/upload/v1673518925/thumbnail_thinking_person_d3d49665bb.jpg 245w,https://res.cloudinary.com/dyfvwmpc8/image/upload/v1673518926/small_thinking_person_d3d49665bb.jpg 500w,https://res.cloudinary.com/dyfvwmpc8/image/upload/v1673518926/medium_thinking_person_d3d49665bb.jpg 750w,https://res.cloudinary.com/dyfvwmpc8/image/upload/v1673518926/large_thinking_person_d3d49665bb.jpg 1000w," sizes="100vw"></p><h2>Who are We?</h2><p>Hello, we are <strong>Universidad de Dagupan</strong> students working on a<strong> capstone project</strong> and <strong>research </strong>that will help people of all walks of life to gain better quality of life in terms of health medical concerns. <br> For our capstone project and research, we developed d system to disseminate the correct information from herbal remedies all the way to modem medicine, anything else that encompasses that. <br> Our goal is to create a system with a news feed or article component, and a <i>wiki-like</i> directory for plants and remedies that are, sometimes, household names.</p><h2>What Exactly is Herbal Aid?</h2><p>In our initial our main goal, really, is to inform people that not every herbal remedy is a good remedy, some of them are not as effective as modern medicine, and some are even outright not working at all. Philippines is a culturally diverse country, so it is quite understandable for our ancestors to carry false teachings in terms of health and safety. &nbsp;</p><p>For example, albularyo is a person who consults with the occult and paranormal events in order to supposedly heal a patient, however since we are already well-versed in how to heal people, we know that consulting with the dead or deities are NOT the reason why people were being healed then.It was because of the wonders of herbal medicines, that allows these albularyos to heal people.</p><h2>What are Your Sources?</h2><p>Well, even though our studies are heavily scoped in the Philippines, there is no denying to the fact that other countries have a plethora of information regarding alternative remedies. Therefore, aside from real, scientific facts backed by the Department of Health (DOH) of the Philippines, we also used peer-reviewed, highly trusted sources from outside the country.</p><h2>Is This Risky?</h2><p>Tackling the human body sometimes can be risky, that\'s why our directory system uses hard-facts in showing the information when it comes to remedies. We are using DOH\'s years worth of experience to populate our data, therefore, as trustworthy DOH and DOST is, you can also trust this system.</p>',
};

const props = defineProps(['title', 'author', 'created', 'content'])
</script>

<template>
  <v-responsive class="border mx-auto my-16 article" max-width="1100">
    <div class="d-flex py-3 justify-space-between">
      <v-responsive>
        <h1>{{ title }}</h1>
        <div class="d-flex justify-space-between">
          <div>{{ author }}</div>
          <div class="text-right">{{ created }}</div>
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
  line-height: 2em;
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
