<template>
  <Title></Title>
  <blog-content></blog-content>
  <Footer></Footer>
</template>

<script lang="ts">
import Title from "./Title.vue";
import Footer from "./Footer.vue";
import BlogContent from "./BlogContent.vue";

// noinspection JSUnusedGlobalSymbols

export default {
  name: "App",
  setup() {
    return {}
  },
  data() {
    return {}
  },
  components: {
    BlogContent,
    Footer,
    Title,
  }
}
</script>

<style scoped>

</style>