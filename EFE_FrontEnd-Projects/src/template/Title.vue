<template>
  <div class="title">
    <div class="logo">
      <a href="https://blog.yunyize.com:8000/">
        <img alt="云奕泽 的博客" v-bind:src="imageTitle">
      </a>
    </div>
    <div class="list">
      <ul>
        <a href="#">
          <li>目录</li>
        </a>|
        <a href="#">
          <li>查找</li>
        </a>|
        <a href="#">
          <li>归档</li>
        </a>|
        <a href="#">
          <li>留言</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import imageTitle from "#/images/title.png"</script>

<style scoped>

</style>