<template>
<div class>
    <img :src="avatarval" class=" userava centermar " alt="...">
    <div class="text-center mb-3 mt-3">用户名： {{nameval}}</div>
    <div class="text-center mb-3 mt-3">性别： {{genderval === 'female'? '女':'男'}}</div>
    <div class="text-center mb-3 mt-3">个人介绍： {{headlineval}}</div>
</div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defUserImage } from '../defaultConfig'

export default defineComponent({
  setup () {
    const route = useRoute()
    const userId = route.params.id
    const nameval = ref('')
    const headlineval = ref('')
    const avatarval = ref('')
    const genderval = ref('')
    onMounted(() => {
      axios.get(`/users/${userId}`).then(res => {
        const data = res.data
        nameval.value = data.name
        headlineval.value = data.headline
        avatarval.value = (data.avatar_url !== '' && data.avatar_url) ? data.avatar_url : defUserImage
        genderval.value = data.gender
      })
    })
    return {
      nameval, headlineval, avatarval, genderval
    }
  }
})
</script>

<style scoped>
.userava {
  border-radius: 50%;
  max-width: 400px;
  max-height: 400px;
}
.centermar {
  margin: 0 50%;
  transform: translate(-50%);
}
</style>
