<template>
  <h3>{{title}}</h3>
  <div class="card mb-2 " v-for="item in listData" :key="item._id">
    <!-- <router-link :to="`/column/${item._id}`"
    class="card-body list-group-item-action text-decoration-none">
      {{item.name || item.title}}
    </router-link> -->
    <div @click="gorouter(item)"
    class="card-body list-group-item-action text-decoration-none">
      {{item.name || item.title}}
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gorouter = (item: any) => {
      if (props.listType === 'questions') {
        router.push(`/question/${item._id}`)
      } else if (props.listType === 'topics') {
        router.push(`/column/${item._id}`)
      }
    }
    return {
      showtitle,
      gorouter
    }
  }
})
</script>
