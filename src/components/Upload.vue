<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传完成</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>点击上传</span>
    </button>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentElement = e.target as HTMLInputElement
      if (currentElement.files) {
        fileStatus.value = 'loading'
        const files = Array.from(currentElement.files)
        const fromData = new FormData()
        fromData.append('file', files[0])
        axios.post(props.action, fromData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data.url, 'res')
          fileStatus.value = 'success'
        }).catch((err) => {
          console.log(err, 'err')
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            console.log(fileInput.value.nodeValue, 'value')
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      handleFileChange,
      fileStatus
    }
  }
})
</script>
