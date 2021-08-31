<template>
<div class="card" style="width: auto;">
  <img :src="questionData.image" class="card-img-top" alt="..." style="width: auto; height: 300px"
  v-if="questionData.image"
  >
  <div class="card-body">
    <h5 class="card-title fs-3">{{questionData.title}}</h5>
    <p class="card-text ">  {{questionData.description}}</p>

    <div class="card-text mt-3 ">
      <span class="card-text fs-5">作者: </span>
      <router-link :to="`/userindex/${queserId}`">
      <img :src="questionData.questioner.userimage" alt="" class="useravatar">
      </router-link>
      <small class="text-muted">{{questionData.questioner.name}}</small>
      <div class=" float-end textcenter">最后更新时间： {{questionData.updateTime}}</div>
    </div>
  </div>
  <div class="btn btn-outline-primary" @click.prevent="toReEdit" v-if="currentUser()">编辑文章</div>
</div>
<div class="shadow-sm p-3 mb-4 bg-body rounded mt-4 fs-5" v-if="nowanswers">
  当前评论:
  <p class="fs-6 text-end">当前共有{{`${nowanswers.length}`}}条评论</p>
</div>
<div class="shadow-sm p-3 mb-4 bg-body rounded mt-4 fs-5" v-if="!nowanswers[0]">
  <div class="card text-center">
  <div class="card-header" >
    当前文章暂时无人评论
  </div>
  <div class="card-body">
    <p class="card-text">快来和大家一起讨论吧</p>
    <div href="#" class="btn btn-primary" @click.prevent="changeCommentShow">发表评论</div>
  </div>
</div>
</div>
<div class="card mb-2 shadow shadow-sm  bg-body rounded" v-for="(ans,index)  in nowanswers" :key="ans._id">
  <div class="card-header text-info">
    <span class="text-start" v-for="(val, key, index) of ans.answererInfo" :key="key">
      <span v-if="index < 1" @click="toUserIndex(ans.answererInfo['_id'])">{{ans.answererInfo['name']}}</span>
    </span>
    <span v-if="!ans.answererInfo" >{{'匿名用户'}}</span>
    <span class="float-end">#{{index + 1}}</span>
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p class="fs-6">{{ans.content}}</p>
      <!-- <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> -->
    </blockquote>
  </div>
</div>
<div  class="btn btn-primary addButton" @click.prevent="changeCommentShow" v-if="isLogin">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
</svg>
</div>
<div  class="btn btn-danger deleteButton" v-if="currentUser()" @click.prevent="changeModalShow">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
</div>
<modal :message="'是否确认删除该文章'" v-if="modalShow">
  <template #truebtn>
    <div class="btn btn-primary float-start" @click.prevent="deleteQuestion">确认</div>
  </template>
  <template #falsebtn>
    <div class="btn btn-primary float-end" @click.prevent="changeModalShow">取消</div>
  </template>
</modal>
<comment v-if="commentShow" :title="`当前正在评论:${questionData.title}`" v-model="getInput">
  <template #truebtn>
    <div class="btn btn-primary float-start" @click.prevent="postComment">确认发布</div>
  </template>
  <template #falsebtn>
    <div class="btn btn-primary float-end" @click.prevent="changeCommentShow">取消编辑</div>
  </template>
</comment>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import createMessage from '../components/createMessage'
import Comment from '../components/Comment.vue'
import Modal from '../components/Modal.vue'
import router from '@/router'
import useTokenError from '../hooks/useTokenError'
import { defUserImage } from '../defaultConfig'

export default defineComponent({
  components: {
    Modal, Comment
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const nowId = route.params.id
    const isLogin = localStorage.getItem('isLogin')
    const queserId = ref('')
    const commentval = ref('')
    const modalShow = ref(false)
    const commentShow = ref(false)
    const questionData = reactive({
      title: '',
      description: '',
      image: '',
      questioner: {
        name: '',
        _id: '',
        userimage: ''
      },
      updateTime: '',
      answerId: ''
    })
    axios.get(`/questions/${nowId}`).then(res => {
      const { title, description, image, questioner, updatedAt } = res.data
      questionData.title = title
      questionData.description = description
      questionData.image = image
      questionData.questioner.name = questioner.name
      questionData.questioner._id = questioner._id
      questionData.questioner.userimage = questioner.avatar_url || defUserImage
      questionData.updateTime = updatedAt ? updatedAt.split('T')[0] : '时间未知'
      queserId.value = questioner._id
    })
    onMounted(() => {
      store.dispatch('getNowAnswers', nowId)
    })
    const nowanswers = computed(() => store.state.nowanswers)
    const deleteQuestion = () => {
      axios.delete(`/questions/${nowId}`).then(() => {
        createMessage('删除成功，即将返回首页', 'success')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      })
    }
    const changeModalShow = () => {
      modalShow.value = !modalShow.value
    }
    const changeCommentShow = () => {
      commentShow.value = !commentShow.value
    }
    const currentUser = () => {
      return queserId.value === localStorage.getItem('_id')
    }
    const toReEdit = () => {
      router.push(`/reedit/${nowId}`)
    }
    const toUserIndex = (id: number) => {
      router.push(`/userindex/${id}`)
    }
    const getInput = computed(() => store.state.comment)
    const postComment = () => {
      axios.post(`/questions/${nowId}/answers`, {
        content: getInput.value
      }).then(() => {
        createMessage('评论成功，即将跳转至问题详情', 'success')
        setTimeout(() => {
          router.go(0)
        }, 1500)
      }).catch(() => {
        useTokenError()
        router.push('/login')
      })
    }
    return {
      nowId,
      questionData,
      nowanswers,
      deleteQuestion,
      currentUser,
      changeModalShow,
      modalShow,
      changeCommentShow,
      commentShow,
      commentval,
      getInput,
      postComment,
      isLogin,
      toReEdit,
      queserId,
      toUserIndex
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
.addButton {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 150px;
  right: 40px;
  padding: 20px;
}
.useravatar{
  width: 50px;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 50%;
}
.textcenter {
  line-height: 50px;
}
</style>
