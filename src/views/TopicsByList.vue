<template>
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" v-model="q" @keydown.enter="toSearch">
  <label for="floatingInput">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    模糊搜索话题</label>
</div>
  <card-list :title="'全部话题'" :listData="list" :listType="'topics'">
  </card-list>
  <add-button :showing="userLoginState()" @click="toCreate"></add-button>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous" @click="changepage(-1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">{{page}}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next" @click="changepage(1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import CardList from '../components/CardList.vue'
import AddButton from '../components/AddButton.vue'
import router from '@/router'

export default defineComponent({
  components: {
    CardList,
    AddButton
  },
  setup () {
    const page = ref(1)
    const q = ref('')
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    const userLoginState = () => {
      // eslint-disable-next-line no-unneeded-ternary
      return localStorage.getItem('isLogin') === 'true' ? true : false
    }
    const toCreate = () => {
      router.push('/createtopic')
    }
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const changepage = (num: number) => {
      page.value += num
      store.dispatch('fetchColumns', page.value)
    }
    const toSearch = () => {
      store.dispatch('fetchColumnsByQ', q.value)
    }
    return {
      list,
      userLoginState,
      toCreate,
      changepage,
      page,
      toSearch,
      q
    }
  }
})
</script>
