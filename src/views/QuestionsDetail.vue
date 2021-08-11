<template>
<div class="card" style="width: auto;">
  <img :src="questionData.image" class="card-img-top" alt="..." style="width: auto; height: 300px"
  v-if="questionData.image"
  >
  <div class="card-body">
    <h5 class="card-title fs-3">{{questionData.title}}</h5>
    <p class="card-text ">  {{questionData.description}}</p>
    <p class="card-text"><small class="text-muted">当前问题发起者：  {{questionData.questioner.name}}</small></p>
  </div>
</div>
<div class="shadow-sm p-3 mb-4 bg-body rounded mt-4 fs-5" v-if="nowanswers">当前评论:</div>
<div class="shadow-sm p-3 mb-4 bg-body rounded mt-4 fs-5" v-if="!nowanswers[0]">
  <div class="card text-center">
  <div class="card-header">
    当前文章暂时无人评论
  </div>
  <div class="card-body">
    <p class="card-text">快来和大家一起讨论吧</p>
    <a href="#" class="btn btn-primary">发表评论</a>
  </div>
</div>
</div>
<div class="card mb-2 shadow shadow-sm  bg-body rounded" v-for="(ans,index)  in nowanswers" :key="ans._id">
  <div class="card-header text-info">
    当前为第{{index + 1}}楼
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p class="fs-6">{{ans.content}}</p>
      <!-- <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> -->
    </blockquote>
  </div>
</div>
<div  class="btn btn-danger deleteButton" v-if="currentUser()" @click.prevent="deleteQuestion">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import createMessage from '../components/createMessage'
import router from '@/router'

export default defineComponent({
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const nowId = route.params.id
    const queserId = ref('')
    const questionData = reactive({
      title: '',
      description: '',
      image: '',
      questioner: {
        name: '',
        _id: ''
      }
    })
    axios.get(`/questions/${nowId}`).then(res => {
      const { title, description, image, questioner } = res.data
      questionData.title = title
      questionData.description = description
      questionData.image = image
      questionData.questioner.name = questioner.name
      questionData.questioner._id = questioner._id
      queserId.value = questioner._id
    })
    onMounted(() => {
      store.dispatch('getNowAnswers', nowId)
    })
    const nowanswers = computed(() => store.state.nowanswers)
    const deleteQuestion = () => {
      axios.delete(`/questions/${nowId}`).then(() => {
        console.log('delete')
        createMessage('删除成功，即将返回首页', 'success')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      })
    }
    const currentUser = () => {
      return queserId.value === localStorage.getItem('_id')
    }
    return {
      nowId, questionData, nowanswers, deleteQuestion, currentUser
    }
  }
})
</script>

<style scoped>
.deleteButton {
  border: tomato 1px solid;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 50px;
  right: 40px;
  padding: 20px;
}
</style>
