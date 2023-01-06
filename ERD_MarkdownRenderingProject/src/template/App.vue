<template>
  <div ref="mdContainer" class="mdContainer markdown-body"></div>
</template>

<script lang="ts">
import {onMounted, ref, Ref} from "vue";
import {marked} from "marked";
import hljs from "highlight.js";
import axios from "axios";


import "../style/common.css"
import "jetbrains-mono-webfont/jetbrains-mono.css"
import "github-markdown-css/github-markdown.css"
import "highlight.js/styles/github.css"

export default {
  setup() {
    const mdURL: string = "<apiServer>";
    const mdContainer: Ref = ref();
    const renderMarkdown: marked.Renderer = new marked.Renderer();

    marked.setOptions({
      renderer: renderMarkdown,
      highlight: (code: string) => {
        return hljs.highlightAuto(code).value;
      }
    })

    onMounted(() => {
      axios.get(mdURL).then(
          response => {
            return response.data
          },
          failure => {
            return failure.response.data
          }
      ).then(
          data => {
            mdContainer.value.innerHTML = marked(data as string)
          }
      )
    })

    return {
      mdContainer
    }
  }
}
</script>

<style scoped>
.mdContainer {
  /*width: 60%;*/
  overflow: hidden;
  margin: 0 auto;
  font-family: "JtBrains Mono NL", "Noto Sans SC", serif;
}

img {
  width: 100%;
}
</style>