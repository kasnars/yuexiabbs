<template>
  <div class="container">
    <global-header :user="currentUsers"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">者也论坛</li>
          <li class="list-inline-item">关于</li>
          <li class="list-inline-item">联系我</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const store = useStore()
    const emailval = ref('')
    const passwordval = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const currentUsers = computed(() => store.state.user)
    const onFormSubmit = (result:boolean) => {
      console.log('result', result)
    }
    return {
      currentUsers,
      emailRef,
      emailval,
      passwordval,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
