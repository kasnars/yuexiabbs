<template>
<div class="d-flex align-items-center container ">
  <div class="flex-shrink-0">
    <router-link :to="`/userindex/${id}`">
    <img :src="avatarval" alt="..." class="img-fluid userImage">
    </router-link>
  </div>
  <div class="flex-grow-1 ms-3">
    <p class="text-end fs-3">{{nameval}}</p>
    <p class="text-end fs-3">欢迎登录月下论坛</p>
    <p class="text-end fs-4">{{headlineval}}</p>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { defUserImage } from '../defaultConfig'
import axios from 'axios'

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const id = ref(props.userId)
    const nameval = ref('')
    const headlineval = ref('')
    const avatarval = ref('')
    onMounted(() => {
      axios.get(`/users/${id.value}`).then(res => {
        const data = res.data
        nameval.value = data.name
        headlineval.value = data.headline
        avatarval.value = (data.avatar_url !== '' && data.avatar_url) ? data.avatar_url : defUserImage
      })
    })
    return {
      id,
      defUserImage,
      nameval,
      headlineval,
      avatarval
    }
  }
})
</script>

<style scoped>
.userImage {
  width: 300px;
  height: 300px;
  border: solid 1px transparent;
  border-radius: 50%;
}
</style>
