<template>
<div class="card text-white bg-primary mb-3" style="max-width: 100%;">
  <div class="card-header">关于论坛</div>
  <div class="card-body">
    <h5 class="card-title">{{aboutTitle}}</h5>
    <p class="card-text">{{'前端： Typescript, vue3 '}}</p>
    <p class="card-text">{{'后端： Node.js，koa2，Mongodb, Mongosee'}}</p>
    <p class="card-text">{{'部署： 腾讯云， centos， PM2'}}</p>
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const aboutTitle = '本论坛开发所用技术栈'
    return {
      aboutTitle
    }
  }
})
</script>
