<template>
  <h3>{{title}}</h3>
  <div class="card mb-2 " v-for="item in listData" :key="item._id">
    <!-- <router-link :to="`/column/${item._id}`"
    class="card-body list-group-item-action text-decoration-none">
      {{item.name || item.title}}
    </router-link> -->
    <div @click="gorouter"
    class="card-body list-group-item-action text-decoration-none">
      {{item.name || item.title}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    listType: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const showtitle = ref(props.title)
    const gorouter = (e: unknown) => console.log(e, 'e')
    return {
      showtitle,
      gorouter
    }
  }
})
</script>
