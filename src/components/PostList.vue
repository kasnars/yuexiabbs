<template>
  <div v-for="post in list" :key="post.id">
    <div class="card mb-3">
      <div class="card-header">
        {{ post.title }}
      </div>
      <div class="card-body">
        <img :src="post.image" class="card-img-left " alt="..." v-if="post.image">
        <blockquote class="blockquote mb-0">
          <p>{{ post.content }}</p>
          <footer class="blockquote-footer">{{ post.createdAt }}</footer>
        </blockquote>
      </div>
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
