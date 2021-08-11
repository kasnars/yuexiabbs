<template>
  <h4 style="margin-bottom: 30px">发布新文章</h4>
  <upload :action="'/upload'"></upload>
  <vaildate-form @from-submit="onFormSubmit">
    <img :src = "nowimage" class="img-thumbnail imagetemp" alt="..." v-if="nowimage">
    <h5>文章标题</h5>
    <vaildate-input :rules="titleRule" v-model="titleval"></vaildate-input>
    <h5>文章内容</h5>
    <vaildate-input :rules="contentRule" v-model="contentval"
    tag="textarea"
    rows="10"
    ></vaildate-input>
    <template #submit>
      <div class="d-grid gap-2" >
        <button class="btn btn-primary" type="button" >现在发布</button>
      </div>
    </template>
  </vaildate-form>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import VaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import VaildateForm from '../components/VaildateForm.vue'
import Upload from '../components/Upload.vue'
import { GlobalDataProps } from '../store'
import axios from 'axios'
import createMessage from '../components/createMessage'

export default defineComponent({
  name: 'CreatePage',
  components: {
    VaildateInput,
    VaildateForm,
    Upload
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const titleval = ref('')
    const contentval = ref('')
    const titleRule:RulesProp = [
      { type: 'password', message: '标题长度不得小于6个字符' }
    ]
    const contentRule:RulesProp = [
      { type: 'password', message: '内容长度不得小于6个字符' }
    ]
    const nowimage = computed(() => store.state.tempUrl)
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          title: titleval.value,
          description: contentval.value,
          image: nowimage.value
        }
        axios.post('questions', payload).then(res => {
          const newquesurl = res.data._id
          createMessage('发布成功，即将跳转至文章', 'success')
          setTimeout(() => {
            router.push(`/question/${newquesurl}`)
          }, 2000)
        })
      }
    }
    onMounted(() => {
      store.state.tempUrl = ''
    })
    return {
      titleRule, contentRule, titleval, contentval, onFormSubmit, nowimage
    }
  }
})
</script>

<style scoped>
.imagetemp {
  height: 300px;
  width: 300px;
  border: 1px solid #f5f5f5;
}
</style>
