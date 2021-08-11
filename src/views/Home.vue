<template>
  <div class="container">
    <!-- <upload :action="'/upload'" :beforeupload="beforeupload" @file-uploaded="onFileUploaded">
      <h2>点击上传</h2>
      <template #uploaded >
        <img :src="tempurl" alt="">
      </template>
    </upload> -->
    <img src="https://img0.baidu.com/it/u=605166524,1097055388&fm=26&fmt=auto&gp=0.jpg"
    class="img-fluid w-100 p-3" alt="...">
    <h4 class="text-center">热门提问</h4>
    <questions-list :questions="queslist"></questions-list>
    <h4 class="text-center">热门话题</h4>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList from '../components/ColumnList.vue'
import QuestionsList from '../components/QuestionsList.vue'
import createMessage from '../components/createMessage'
import { useStore } from 'vuex'
import { GlobalDataProps, ResponseType, ImageProps } from '../store'

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    QuestionsList
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const list = computed(() => store.state.columns)
    const queslist = computed(() => store.state.questions)
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
    return {
      list, queslist, beforeupload, onFileUploaded, tempurl
    }
  }
})
</script>

<style scoped>
</style>
