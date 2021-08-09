<template>
  <div class="container">
    <upload :action="'/upload'"></upload>
    <h4 class="text-center">热门提问</h4>
    <questions-list :questions="queslist"></questions-list>
    <h4 class="text-center">热门话题</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from '../components/ColumnList.vue'
import QuestionsList from '../components/QuestionsList.vue'
import Upload from '../components/Upload.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    QuestionsList,
    Upload
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    const queslist = computed(() => store.state.questions)
    onMounted(() => {
      store.dispatch('fetchColumns')
      store.dispatch('fetchQuestions')
    })
    return {
      list, queslist
    }
  }
})
</script>

<style scoped>
</style>
