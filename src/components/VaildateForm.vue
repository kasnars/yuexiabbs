<template>
  <form class="vaildate-from-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type VaildateFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  emits: ['from-submit'],
  setup (props, context) {
    let funcArray: VaildateFunc[] = []
    const submitForm = () => {
      const result = funcArray.map(func => func()).every(res => res)
      context.emit('from-submit', result)
    }
    const callback = (func: VaildateFunc) => {
      funcArray.push(func)
    }
    emitter.on('form-item-created', callback as VaildateFunc)
    onUnmounted(() => {
      emitter.off('form-item-created', callback as VaildateFunc)
      funcArray = []
    })
    return {
      submitForm
    }
  }
})
</script>
