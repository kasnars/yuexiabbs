<template>
  <div class="p-3 mb-2 bg-info text-dark w-auto p-3 text-center fs-4">欢迎注册</div>
  <vaildate-form @from-submit="onSgin">
    <vaildate-input v-model="nameval" placeholder="请输入用户名"
    :rules="nameRule">
    </vaildate-input>
    <vaildate-input v-model="passwordval" placeholder="请输入密码" type="password"
    :rules="passwordRule">
    </vaildate-input>
  <template #submit>
    <span  class="btn btn-info w-100 p-3">注册</span>
  </template>
  </vaildate-form>
</template>

<script lang="ts">
import VaildateForm from '@/components/VaildateForm.vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import VaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import createMessage from '../components/createMessage'
import axios from 'axios'

export default defineComponent({
  name: 'regist',
  components: {
    VaildateInput,
    VaildateForm
  },
  setup () {
    const router = useRouter()
    const nameRule:RulesProp = [
      { type: 'name', message: '用户名不得少于4位' },
      { type: 'required', message: '用户名不得为空' }
    ]
    const passwordRule:RulesProp = [
      { type: 'password', message: '密码不得少于6位' },
      { type: 'required', message: '用户名不得为空' }
    ]
    const nameval = ref('')
    const passwordval = ref('')
    const onSgin = (res:boolean) => {
      if (res) {
        axios.post('/users', {
          name: nameval.value,
          password: passwordval.value
        }).then(res => {
          if (res) {
            createMessage('注册成功，即将转向登录页面', 'success')
            setTimeout(() => {
              router.push('/login')
            }, 2000)
          }
        })
      }
    }
    return {
      nameval,
      passwordval,
      nameRule,
      passwordRule,
      onSgin
    }
  }
})
</script>
