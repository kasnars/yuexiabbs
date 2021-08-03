<template>
  <div class="container">
    <global-header :user="currentUsers"></global-header>
    <column-list :list="list"></column-list>
  <vaildate-form @from-submit="onFormSubmit">
  <div class="mb-3">
    <label class="from-label">邮箱地址</label>
    <vaildate-input :rules="emailRules" v-model="emailval"
    type="text" placeholder="请输入邮箱"></vaildate-input>
    {{emailval}}
  </div>
    <div class="mb-3">
    <label class="from-label">密码</label>
    <vaildate-input :rules="passwordRules" v-model="passwordval"
    type="password" placeholder="请输入密码"></vaildate-input>
    {{passwordval}}
  </div>
  <template #submit>
    <span  class="btn btn-danger">Submit</span>
  </template>
</vaildate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import vaildateInput, { RulesProp } from './components/VaildateInput.vue'
import vaildateForm from './components/VaildateForm.vue'

const currentUsers:UserProps = {
  isLogin: true,
  name: 'lyx'
}
const testData:ColumnProps[] = [
  {
    id: 1,
    title: 'test1',
    description: 'this is test',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 2,
    title: 'test2',
    description: 'this is test'
    // avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 3,
    title: 'test3',
    description: 'this is test',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 4,
    title: 'test4',
    description: 'this is test',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    vaildateInput,
    vaildateForm
  },
  setup () {
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
    }
    return {
      list: testData,
      currentUsers,
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
