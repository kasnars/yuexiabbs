<template>
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" v-model="searchval" @keydown.enter="toSearch">
  <label for="floatingInput">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    模糊搜索文章</label>
</div>
  <card-list  :title="'全部文章列表'" :listData="queslist" :listType="'questions'"></card-list>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"
    :class="{'disabled': page === 1}"
    >
      <a class="page-link" href="#" aria-label="Previous" @click="changepage(-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">{{page}}</a></li>
    <li class="page-item "
    :class="{'disabled': queslist.length !== 10, 'dont': queslist.length !== 10}">
      <a class="page-link" href="#" aria-label="Next" @click="changepage(1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, reactive } from 'vue'
import CardList from '../components/CardList.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import axios from 'axios'

export default defineComponent({
  components: {
    CardList
  },
  setup () {
    const resdatalength = ref(0)
    const page = ref(1)
    const searchval = ref('')
    const store = useStore<GlobalDataProps>()
    const queslist = computed(() => store.state.questions)
    console.log(queslist.value, 'q')
    onMounted(() => {
      store.dispatch('fetchQuestions')
      axios.get('/questions').then(res => {
        resdatalength.value = res.data.length
        console.log(resdatalength.value, 'length')
      })
    })
    const changepage = (num: number) => {
      page.value += num
      store.dispatch('fetchQuestions', page.value)
    }
    const toSearch = () => {
      store.dispatch('fetchQuestionsByQ', searchval.value)
    }
    return {
      queslist,
      changepage,
      page,
      searchval,
      toSearch,
      resdatalength
    }
  }
})
</script>

<style scoped>
.dont {
  cursor:not-allowed;
}
</style>
