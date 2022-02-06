<template>
      <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <div class="list-inline mb-0 mouse">
          <div class="list-inline-item" @click="toHome">月下论坛</div>
          <li class="list-inline-item" @click="toAbout">关于</li>
          <li class="list-inline-item" @click="toCallMe">联系我</li>
          <li class="list-inline-item" @click="toGitee">更多</li>
        </div>
      </small>
      <small :style="{margin:'10px'}">
        <div>当前版本：{{version}}</div>
        <span>
          <a href="https://beian.miit.gov.cn/">备案号：鄂ICP备2021014329号</a>
        </span>
      </small>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import createMessage from '../components/createMessage'

export default defineComponent({
  setup () {
    const router = useRouter()
    const toHome = () => router.push('/')
    const toAbout = () => router.push('/about')
    const toGitee = () => {
      // open方法第二个参数传入'_blank'可以在新窗口打开
      window.open('https://gitee.com/kasnars', '_blank')
      // window.location.href = 'https://gitee.com/kasnars'
    }
    const toCallMe = () => {
      createMessage('邮箱：kasnars@163.com', 'success', 5000)
    }
    const version = '1.0.1'
    return {
      toHome,
      toAbout,
      toGitee,
      toCallMe,
      version
    }
  }
})
</script>

<style scoped>
.mouse{
  cursor: pointer;
}
</style>
