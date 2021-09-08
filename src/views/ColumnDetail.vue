<template>
  <div class="card mb-3" style="max-width: 1400px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="nowtopic.avatar_url ? nowtopic.avatar_url : defTopicImage"
      class="img-fluid rounded-start" alt="column.title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{nowtopic.name}}</h5>
        <div class="card-text">{{nowtopic.introduction ? nowtopic.introduction : '当前话题还未添加描述'}}</div>
        <!-- <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> -->
      </div>
    </div>
  </div>
</div>
<div class="card mb-5 bg-info">
  <div class="card-body " v-if="list.length > 0">
    当前话题下共有{{list.length}}篇文章
  </div>
  <div class="card-body" v-else>
    当当前话题下暂无文章
  </div>
</div>
<post-list :list="list"></post-list>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { testData, testPosts } from '../testData'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import PostList from '../components/PostList.vue'
import { defTopicImage } from '../defaultConfig'

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
      nowtopic,
      defTopicImage
    }
  }
})
</script>

<style scoped>
.maximage{
  max-height: 500px;
  max-width: 500px;
}
</style>
