<template>
  <h4 style="margin-bottom: 30px">发布新文章</h4>
  <vaildate-form>
    <h5>文章标题</h5>
    <vaildate-input :rules="titleRule" v-model="titleval"></vaildate-input>
    <h5>文章内容</h5>
    <vaildate-input :rules="contentRule" v-model="contentval"
    tag="textarea"
    rows="10"
    ></vaildate-input>
    <template #submit>
      <div class="d-grid gap-2" >
        <button class="btn btn-primary" type="button" @click.prevent="onFormSubmit">现在发布</button>
      </div>
    </template>
  </vaildate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import VaildateInput, { RulesProp } from '../components/VaildateInput.vue'
import VaildateForm from '../components/VaildateForm.vue'
import { GlobalDataProps } from '../store'
import { PostProps } from '../testData'

export default defineComponent({
  name: 'CreatePage',
  components: {
    VaildateInput,
    VaildateForm
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
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost:PostProps = {
            id: new Date().getTime(),
            title: titleval.value,
            content: contentval.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push(`/column/${columnId}`)
        }
      }
    }
    return {
      titleRule, contentRule, titleval, contentval, onFormSubmit
    }
  }
})
</script>
