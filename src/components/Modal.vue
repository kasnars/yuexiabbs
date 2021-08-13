<template>
  <div class="mask">
  <div class="card text-dark bg-white mb-3 position-absolute top-50 start-50 translate-middle" style="max-width: 18rem;">
  <div class="card-header fs-5">提示</div>
  <div class="card-body">
    <h5 class="card-title text-center fs-6">{{message}}</h5>
    <slot name="input"></slot>
    <slot name="truebtn">
      <div class="btn btn-primary float-start">truebtn</div>
    </slot>
    <slot name="falsebtn">
      <div class="btn btn-primary float-end">falsebtn</div>
    </slot>
  </div>
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    message: {
      type: String
    }
  }
})
</script>

<style scoped>
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background:rgba(0,0,0,.3);
}
.modal{
  position: fixed;
  /* transform: translate(-50%, -50%); */
  top: 50%;
  right: 50%;
}
</style>
