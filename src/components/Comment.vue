<template>
<div class="mask">
  <div class="mb-3 position-absolute top-50 start-50 translate-middle"
  style="width: 500px; backgroundColor: #F0F8FF;border-radius: 8px;">
    <label for="exampleFormControlTextarea1" class="form-label fs-5 mb-3 pt-3"
    style="lineHight: 10px"
    >{{title}}</label>
    <textarea class="form-control mb-1" id="exampleFormControlTextarea1" rows="8" cols="5"
    v-model="comVal" @input="inputtest"
    ></textarea>
    <slot name="truebtn" >
      <div class="btn btn-primary float-start" >truebtn</div>
    </slot>
    <slot name="falsebtn">
      <div class="btn btn-primary float-end">falsebtn</div>
    </slot>
  </div>
</div>
</template>

<script lang="ts">
// import store from '@/store'
import store from '@/store'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    message: {
      type: String
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  setup () {
    const comVal = ref('')
    const inputtest = (e:KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      comVal.value = targetValue
      store.commit('inputComment', comVal.value)
    }
    return {
      comVal, inputtest
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
  background: blue;
}
</style>
