<template>
  <div  class="btn btn-primary addButton" v-if="showing">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
</svg>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    showing: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style scoped>
.addButton {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 150px;
  right: 40px;
  padding: 20px;
}
</style>
