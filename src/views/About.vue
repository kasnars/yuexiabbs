<template>
<div class="card text-white bg-primary mb-3" style="max-width: 100%;">
  <div class="card-header">关于论坛</div>
  <div class="card-body">
    <h5 class="card-title">{{aboutTitle}}</h5>
    <p class="card-text">{{about}}</p>
  </div>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { about } from '../text'

export default defineComponent({
  setup () {
    const aboutTitle = '本论坛开发所用技术栈'
    return {
      about,
      aboutTitle
    }
  }
})
</script>
