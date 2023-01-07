<template>
  <div ref="container" class="blog_box">

  </div>
</template>

<script lang="ts">
import {ref, onMounted} from "vue";
import axios from "axios";
import yunyize_blog from "../script/function/lLibraryBlog";
import yunyize_waterfallsFlow from "../script/function/lWaterfallsFlow";

import config from "../script/config";


// noinspection JSUnusedGlobalSymbols
export default {
  name: "BlogContent",
  setup: function () {
    const container = ref();
    const main = new yunyize_blog();
    const wff = new yunyize_waterfallsFlow();

    const loadAni = main.loadingAnimationInit();

    onMounted(() => {
      main.loadingAnimation(container.value, loadAni);
      // 构造请求
      axios.get(config.api).then(response => {
        // 判断请求是否成功
        if (response.status === 200) {
          // 判断请求得来的数据是否为预期的对象，如果不是就JSON构造一下
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            try {
              return JSON.parse(response.data)
            } catch (e) {
              // 错误返回空
              return []
            }
          }
        }
      }).then(data => {
        // 数据请求到了 结束加载动画
        main.loadingAnimationOver(loadAni);

        const blogItems = main.loadBlogs(data as Array<BlogsData>, container.value);
        main.showBlogItem(blogItems)
        main.optimizeContainerWidth(.6, 300, 25, container.value)
        wff.waterFall(blogItems, 300, 25, container.value)

        window.onresize = () => {
          main.optimizeContainerWidth(.6, 300, 25, container.value)
          wff.waterFall(blogItems, 300, 25, container.value)
        }
      })
    })

    return {
      container
    }
  },
}
</script>

<style scoped>

</style>