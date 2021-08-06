<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img :src="nowtopic.avatar_url" :alt="column.title" v-if="nowtopic.avatar_url">
      </div>
      <div class="col-9">
        <h4>{{nowtopic.name}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { testData, testPosts } from '../testData'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id
    const column = computed(() => store.state.columns)
    const list = computed(() => store.state.topicsques)
    const nowtopic = computed(() => store.state.nowtopic)
    onMounted(() => {
      store.dispatch('fetchTopicsQues', currentId)
      store.dispatch('fetchNowTopic', currentId)
    })
    return {
      column,
      list,
      nowtopic
    }
  }
})
</script>
