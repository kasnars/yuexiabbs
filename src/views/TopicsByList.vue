<template>
  <card-list :title="'全部话题'" :listData="list" :listType="'topics'"></card-list>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import CardList from '../components/CardList.vue'

export default defineComponent({
  components: {
    CardList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    return {
      list
    }
  }
})
</script>
