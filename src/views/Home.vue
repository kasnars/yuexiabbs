<template>
  <div class="container">
    <user-show :userId="userid" class="mb-3" v-if="userid"></user-show>
    <!-- <img src="https://img0.baidu.com/it/u=605166524,1097055388&fm=26&fmt=auto&gp=0.jpg"
    class="img-fluid w-100 p-3" alt="..."> -->
      <div class="card" v-else>
        <img src="https://img1.baidu.com/it/u=2716035155,4250794299&fm=11&fmt=auto&gp=0.jpg" alt=""
        class="imageSize"
        >
        <div class="card-body">
          您还未登录，请先登录捏
        </div>
      </div>
    <h4 class="text-start mb-3">热门提问</h4>
    <questions-list :questions="queslist" class="mb-5"></questions-list>
    <div class="d-grid gap-2">
      <button class="btn btn btn-outline-primary mb-3" type="button"
      @click="toMoreQues"
      >查看更多文章</button>
    </div>
    <h4 class="text-start mt-3 mb-3">热门话题</h4>
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
      list, queslist, beforeupload, onFileUploaded, tempurl, userid, toMoreTopics, toMoreQues
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
