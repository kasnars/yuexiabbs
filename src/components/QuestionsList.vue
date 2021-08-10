<template>
  <div class="card">
    <router-link :to="`/question/${ques._id}`" type="button" class="list-group-item list-group-item-action"
    v-for="ques in questions" :key="ques._id"
    >{{ques.title}}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from 'vue'

export interface QuesProps{
  title: string;
  description: string
}
export default defineComponent({
  name: 'QuestionsList',
  props: {
    questions: {
      type: Array as PropType<QuesProps[]>,
      required: true
    }
  },
  setup (props) {
    onMounted(() => {
      console.log('que', props.questions)
    })
  }
})
</script>
