<template>
  <div class="container">
    <column-list :list="list"></column-list>
  <vaildate-form @from-submit="onFormSubmit">
  <div class="mb-3">
    <label class="from-label">邮箱地址</label>
    <vaildate-input :rules="emailRules" v-model="emailval"
    type="text" placeholder="请输入邮箱"></vaildate-input>
  </div>
    <div class="mb-3">
    <label class="from-label">密码</label>
    <vaildate-input :rules="passwordRules" v-model="passwordval"
    type="password" placeholder="请输入密码"></vaildate-input>
  </div>
  <template #submit>
    <span  class="btn btn-danger">Submit</span>
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

export default defineComponent({
  name: 'App',
  components: {
    vaildateInput,
    vaildateForm
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const emailval = ref('')
    const passwordval = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordRules: RulesProp = [
      { type: 'password', message: '密码不得少于6位' }
    ]
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const onFormSubmit = (result:boolean) => {
      console.log('result', result)
      if (result) {
        router.push('/')
        store.commit('login')
      }
    }
    return {
      emailRef,
      emailRules,
      emailval,
      passwordRules,
      passwordval,
      onFormSubmit
    }
  }
})
</script>

<style>
</style>
