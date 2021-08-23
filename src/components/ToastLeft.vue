<template>
  <template></template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const toastshow = true
    return {
      toastshow
    }
  }
})
</script>

<style scoped>
.toast{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 30%;
  border: 1px solid red;
  z-index: 999;
  background: blue;
}
</style>
