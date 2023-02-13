<script setup>
import { ref, watch } from "vue";
import router from "@/router";
import { useThemeStore, useLocaleStore } from "@/store/app"; //I wanted a persisted theme
const theme = useThemeStore();
const i18n = useLocaleStore();
i18n.getLocales();
const heroIntro = ref("");

watch(i18n, () => {
  if (i18n.locale === "en") {
    heroIntro.value =
      "We will help YOU make informed decisions when using herbal remedies. Get started by clicking a link below.";
  } else if (i18n.locale === "fil") {
    heroIntro.value =
      "Sasamahan ka namin para makapagdesisyon ng mabuti sa paggamit ng alternatibong medisina. Mag-umpisa sa pagclick ng link sa baba.";
  }
});
</script>

<template>
  <v-img
    class="mx-auto my-5"
    src="@/assets/logo-no-background.png"
    width="350px"
  >
  </v-img>
  <v-responsive
    class="mt-10 text-center mx-auto"
    width="1020"
    :style="'color:' + theme.color"
  >
    <p class="text-h4">{{ heroIntro }}</p>
  </v-responsive>
  <div class="text-center">
    <v-btn
      @click="router.push('/newsfeed')"
      :color="theme.color"
      class="ma-5"
      variant="outlined"
      stacked
      prepend-icon="mdi-post"
      width="300"
      >News Feed</v-btn
    >
    <v-btn
      @click="router.push('/remedies')"
      :color="theme.color"
      class="ma-5"
      variant="outlined"
      stacked
      prepend-icon="mdi-sprout"
      width="300"
      >Remedies Directory</v-btn
    >
    <v-btn
      @click="router.push('/doctors')"
      :color="theme.color"
      class="ma-5"
      variant="outlined"
      stacked
      prepend-icon="mdi-doctor"
      width="300"
      >Doctors' Directory</v-btn
    >
    <v-btn
      @click="router.push('/about')"
      :color="theme.color"
      class="ma-5"
      variant="outlined"
      stacked
      prepend-icon="mdi-information"
      width="300"
      >About Us</v-btn
    >
  </div>
  <v-img class="mx-auto" src="/hero.png" width="1150px"> </v-img>
</template>
<style scoped></style>
