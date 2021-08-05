<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link to="/" class="navbar-brand">者也专栏</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item"><router-link to="login" class="btn btn-outline-light my-2">登陆</router-link></li>
      <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好，${user.name}`">
          <dropdownitem><a href="#" class="dropdown-item" @click="toCreatePage">新建文章</a></dropdownitem>
          <dropdownitem disabled><a href="#" class="dropdown-item">编辑资料</a></dropdownitem>
          <dropdownitem><a href="#" class="dropdown-item">退出登录</a></dropdownitem>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import Dropdown from './DropDown.vue'
import Dropdownitem from './DropDownitem.vue'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number
}
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    Dropdown,
    Dropdownitem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const router = useRouter()
    const toCreatePage = () => {
      router.push('/createpage')
    }
    return {
      toCreatePage
    }
  }
})
</script>
