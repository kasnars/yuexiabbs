<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadData="uploadData">
        <button class="btn btn-primary" disabled>上传完成</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'" name="error">
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeupload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const store = useStore<GlobalDataProps>()
    const fileInput = ref<null | HTMLElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentElement = e.target as HTMLInputElement
      if (currentElement.files) {
        // files获取上传文件并转为数组
        const files = Array.from(currentElement.files)
        if (props.beforeupload) {
          const result = props.beforeupload(files[0])
          if (!result) { return }
        }
        fileStatus.value = 'loading'

        const fromData = new FormData()
        fromData.append('file', files[0])
        axios.post(props.action, fromData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data.url, 'res')
          store.state.tempUrl = res.data.url
          uploadedData.value = res.data
          fileStatus.value = 'success'
          context.emit('file-uploaded', res.data.url)
        }).catch((err) => {
          console.log(err, 'err')
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { err })
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
      fileStatus,
      uploadedData
    }
  }
})
</script>
