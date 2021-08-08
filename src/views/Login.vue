<template>
  <div class="container">
    <column-list :list="list"></column-list>
  <vaildate-form @from-submit="onFormSubmit">
  <div class="mb-3">
    <label class="from-label">用户名</label>
    <vaildate-input :rules="nameRules" v-model="nameval"
    type="text" placeholder="请输入用户名"></vaildate-input>
  </div>
    <div class="mb-3">
    <label class="from-label">密码</label>
    <vaildate-input :rules="passwordRules" v-model="passwordval"
    type="password" placeholder="请输入密码"></vaildate-input>
  </div>
  <template #submit>
    <span  class="btn btn-info w-100 p-3">登录</span>
  </template>
</vaildate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import vaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import vaildateForm from '../components/VaildateForm.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'App',
  components: {
    vaildateInput,
    vaildateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const nameval = ref('')
    const passwordval = ref('')
    const testval = ref('')
    const passwordRules: RulesProp = [
      { type: 'password', message: '密码不得少于6位' },
      { type: 'required', message: '密码不得为空' }
    ]
    const nameRules: RulesProp = [
      { type: 'name', message: '用户名不得少于4位' },
      { type: 'required', message: '用户名不得为空' }
    ]
    const testRule: RulesProp = [
      {
        type: 'custom',
        message: 'budeshaoyu 8',
        myFunc: () => {
          return testval.value.length > 8
        }
      }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onFormSubmit = (result:boolean) => {
      console.log('result', result)
      if (result) {
        const payload = {
          name: nameval.value,
          password: passwordval.value
        }
        store.dispatch('login', payload).then(data => {
          console.log(data, 'data')
          store.state.user.isLogin = true
          store.state.user._id = localStorage.getItem('_id')
          store.state.user.name = localStorage.getItem('name')
          createMessage('登录成功，即将跳转至首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailRef,
      // emailRules,
      nameval,
      passwordRules,
      nameRules,
      passwordval,
      onFormSubmit,
      testRule
    }
  }
})
</script>

<style>
</style>
