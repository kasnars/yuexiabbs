<template>
  <div class="container">
    <user-show :userId="userid" class="mb-3" v-if="userLogin"></user-show>
    <!-- <img src="https://img0.baidu.com/it/u=605166524,1097055388&fm=26&fmt=auto&gp=0.jpg"
    class="img-fluid w-100 p-3" alt="..."> -->
      <div class="card" v-else>
        <img src="https://i.niupic.com/images/2021/09/08/9uGY.jpg
" alt=""
        class="imageSize"
        >
        <div class="card-body">
          您还未登录，请先登录捏
        </div>
      </div>
    <h4 class="text-start mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>
      热门提问</h4>
    <questions-list :questions="queslist" class="mb-5"></questions-list>
    <div class="d-grid gap-2">
      <button class="btn btn btn-outline-primary mb-3" type="button"
      @click="toMoreQues"
      >查看更多文章</button>
    </div>
    <h4 class="text-start mt-3 mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>
      热门话题</h4>
    <column-list :list="list"></column-list>
    <div class="d-grid gap-2">
      <button class="btn btn btn-outline-primary mb-3" type="button"
      @click="toMoreTopics"
      >查看更多话题</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from '../components/ColumnList.vue'
import QuestionsList from '../components/QuestionsList.vue'
import createMessage from '../components/createMessage'
import UserShow from '../components/UserShow.vue'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'
import router from '@/router'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    QuestionsList,
    UserShow
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    const queslist = computed(() => store.state.questions)
    const userid = localStorage.getItem('_id')
    const userLogin = localStorage.getItem('isLogin') === 'true' || false
    onMounted(() => {
      store.dispatch('fetchColumns')
      store.dispatch('fetchQuestions')
    })
    const beforeupload = (file: File) => {
      const isjpg = file.type === 'image/jpeg'
      if (!isjpg) {
        createMessage('只能上传JPG格式文件', 'error')
      }
      return isjpg
    }
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      console.log(rawData, 'raw')
      console.log(rawData.data, 'rawdata')
      createMessage(`上传图片成功，url为${rawData}`, 'success')
    }
    const tempurl = computed(() => store.state.tempUrl)
    const toMoreTopics = () => router.push('/topicslist')
    const toMoreQues = () => router.push('/questionslist')
    return {
      list, queslist, beforeupload, onFileUploaded, tempurl, userid, toMoreTopics, toMoreQues, userLogin
    }
  }
})
</script>

<style scoped>
.imageSize {
  width: 300px;
  height: 300px;
}
</style>
