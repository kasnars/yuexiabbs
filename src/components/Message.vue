<template>
<teleport to="#message">
  <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
  :class="classObject" v-if="isVisible">
    <span>{{message}}</span>
    <button type="button" class="btn-close" aria-label="Close"
    @click.prevent="hide"
    ></button>
  </div>
</teleport>
</template>

<script lang="ts">
import store from '@/store'
import { defineComponent, PropType, ref } from 'vue'
import useDOMcreate from '../hooks/useDOMcreate'

export type MessageType = 'success' | 'error' | 'default'
export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['commit-close'],
  setup (props, context) {
    useDOMcreate('message')
    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }
    const hide = () => {
      isVisible.value = false
      store.commit('setError', false)
      context.emit('commit-close', true)
    }
    return {
      classObject,
      isVisible,
      hide
    }
  }
})
</script>
