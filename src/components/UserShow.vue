<template>
<div class="d-flex align-items-center container ">
  <div class="flex-shrink-0">
    <router-link :to="`/userindex/${id}`">
    <img :src="avatarval" alt="..." class="img-fluid userImage">
    </router-link>
  </div>
  <div class="flex-grow-1 ms-3">
    <p class="text-end fs-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>
      {{nameval}}</p>
    <p class="text-end fs-3">欢迎登录月下论坛</p>
    <p class="text-end fs-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>
      {{headlineval}}</p>
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
