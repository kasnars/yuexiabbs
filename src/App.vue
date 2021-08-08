<template>
  <div class="container">
    <h1>{{err}}</h1>
    <!-- <message :message="err" type="error" v-if="err"></message> -->
    <loader :text="'拼命加载中'" v-if="isLoading"></loader>
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
import { defineComponent, reactive, ref, computed, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from './components/GlobalHeader.vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import Loader from './components/Loader.vue'
import createMessage from './components/createMessage'
import Message from './components/Message.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
    // Message
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
