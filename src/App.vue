<template>
  <div class="container">
    <loader :text="'拼命加载中'" v-if="isLoading"></loader>
    <global-header :user="currentUsers"></global-header>
    <router-view></router-view>
    <global-foot></global-foot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'
import GlobalFoot from './components/GlobalFoot.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader,
    GlobalFoot
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const emailval = ref('')
    const passwordval = ref('')
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const userlogin = (): boolean => {
      if (localStorage.getItem('isLogin') === 'true') {
        return true
      } else {
        return false
      }
    }
    const currentUsers = computed(() => store.state.user)
    currentUsers.value.isLogin = userlogin()
    currentUsers.value.name = localStorage.getItem('name') || ''
    currentUsers.value._id = localStorage.getItem('_id') || ''
    const isLoading = computed(() => store.state.loading)
    const onFormSubmit = (result:boolean) => {
      console.log('result', result)
    }
    const err = computed(() => store.state.error.message)
    watch(() => store.state.error.status, () => {
      const { status, message } = store.state.error
      if (status && message) {
        console.log(status, message, 'status and message')
        createMessage(message, 'error')
      }
    })
    return {
      currentUsers,
      emailRef,
      emailval,
      passwordval,
      onFormSubmit,
      isLoading,
      err
    }
  }
})
</script>

<style>
</style>
