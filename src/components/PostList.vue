<template>
  <div v-for="post in list" :key="post.id">
<div class="card mb-3">
  <router-link :to="`/question/${post._id}`"
  class="card-body list-group-item-action text-decoration-none">
    {{post.title}}
  </router-link>
</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '../testData'

export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>
