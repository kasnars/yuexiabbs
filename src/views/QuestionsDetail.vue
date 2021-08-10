<template>
<div class="card" style="width: auto;">
  <img :src="questionData.image" class="card-img-top" alt="..." style="width: auto; height: 300px">
  <div class="card-body">
    <p class="card-text fs-3">{{questionData.title}}</p>
  </div>
</div>
  {{questionData.description}}
  {{questionData.questioner.name}}
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    const nowId = route.params.id
    const questionData = reactive({
      title: '',
      description: '',
      image: '',
      questioner: {
        name: ''
      }
    })
    axios.get(`/questions/${nowId}`).then(res => {
      console.log(res, 'quetionsres')
      const { title, description, image, questioner } = res.data
      questionData.title = title
      questionData.description = description
      questionData.image = image
      questionData.questioner.name = questioner.name
      console.log(questionData, 'questiondata')
    })
    return {
      nowId, questionData
    }
  }
})
</script>
