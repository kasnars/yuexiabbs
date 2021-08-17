<template>
  <card-list  :title="'全部文章列表'" :listData="queslist"></card-list>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import CardList from '../components/CardList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

export default defineComponent({
  components: {
    CardList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const queslist = computed(() => store.state.questions)
    onMounted(() => {
      store.dispatch('fetchQuestions')
    })
    return {
      queslist
    }
  }
})
</script>
