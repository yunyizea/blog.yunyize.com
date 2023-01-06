<template>
  <div class="footer">
    <p>Powered by Webpack</p>
    <p>Copyright 2019&copy;{{ year }} <a v-bind:href="indexURL">云奕泽</a>的博客</p>
  </div>
</template>

<script lang="ts" setup>
const year: number = new Date().getFullYear() + 1
const indexURL: string = "https://blog.yunyize.com:8000/#"
</script>

<style scoped>
.footer a:hover {
  color: #237804;
}
</style>