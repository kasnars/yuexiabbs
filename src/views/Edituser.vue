<template>

<div class="card mb-4">
  <div class="card-body fs-4">
    我的个人简介
  </div>
</div>

  <div class="card mb-3" style="max-width: 1400px;" v-if="!editcard">
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="avatarval" class="img-fluid rounded-start sizeCtrl" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fs-4">用户名： {{nameval}}</h5>
        <p class="card-text mt-5 fs-5"> 性别： {{genderval === 'female'? '女': '男'}}</p>
        <p class="card-text mt-5 fs-5"> 个人简介： {{headlineval}}</p>
        <button type="button" class="btn btn-outline-primary mt-3" @click="toedit">修改资料</button>
        <p class="card-text position-absolute bottom-0 end-0">
          <small class="text-muted">
            上一次更新资料时间： {{updataDateval}}
          </small></p>
      </div>
    </div>
  </div>
</div>

  <div class="card mb-3" style="max-width: 1400px;" v-else>
  <div class="row g-0">
    <div class="col-md-4">
      <img :src="avatarval" class="img-fluid rounded-start sizeCtrl" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <div class="input-group mb-3">
  <label class="input-group-text mr" for="inputGroupFile01">头像：</label>
   <upload :action="'/upload'" @click="changeuploaded"></upload>
   <button class="btn btn-outline-secondary"
  type="button" id="inputGroupFileAddon04" @click="changeAvatarval"
  v-if="uploaded"
  >上传完成后确认并预览</button>
</div>
<div class="input-group input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-lg">用户名：</span>
  <input type="text" class="form-control"
  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
  v-model="nameval"
  >
</div>
<div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">性别：</label>
  <select class="form-select" id="inputGroupSelect01" v-model="genderval">
    <option selected value="male">未选择，默认为男性</option>
    <option value="female">女</option>
    <option value="male">男</option>
  </select>
</div>

<div class="input-group mb-3">
  <span class="input-group-text">一句话个人简介：</span>
  <textarea class="form-control" aria-label="With textarea" rows="1" v-model="headlineval"></textarea>
</div>
        <p class="card-text position-absolute bottom-0 end-0">
          <small class="text-muted">
            上一次更新资料时间： {{updataDateval}}
          </small></p>
<button type="button" class="btn btn-outline-primary mr" @click="patchuser">完成更改</button>
<button type="button" class="btn btn-outline-secondary" @click="toedit">取消修改</button>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { defineComponent, onMounted, ref } from 'vue'
import upload from '../components/Upload.vue'
import createMessage from '../components/createMessage'

export default defineComponent({
  components: {
    upload
  },
  setup () {
    const noimage = 'https://img2.baidu.com/it/u=2561659095,299912888&fm=26&fmt=auto&gp=0.jpg'
    const userId = localStorage.getItem('_id')
    const nameval = ref('')
    const headlineval = ref('')
    const avatarval = ref('')
    const genderval = ref('')
    const updataDateval = ref('')
    const editcard = ref(false)
    const uploaded = ref(false)
    onMounted(() => {
      axios.get(`/users/${userId}`).then(res => {
        console.log(res)
        const data = res.data
        nameval.value = data.name
        headlineval.value = data.headline
        avatarval.value = (data.avatar_url !== '' && data.avatar_url) ? data.avatar_url : noimage
        genderval.value = data.gender
      })
    })
    const changeAvatarval = () => {
      avatarval.value = store.state.tempUrl
    }
    const toedit = () => {
      editcard.value = !editcard.value
      if (!editcard.value) { router.go(0) }
    }
    const changeuploaded = () => {
      uploaded.value = true
    }
    const patchuser = () => {
      axios.patch(`/users/${userId}`, {
        name: nameval.value,
        avatar_url: avatarval.value,
        headline: headlineval.value,
        gender: genderval.value
      }).then(() => {
        createMessage('修改成功，即将返回', 'success')
        setTimeout(() => {
          router.go(0)
        }, 1000)
      })
    }
    return {
      userId,
      nameval,
      headlineval,
      avatarval,
      genderval,
      updataDateval,
      changeAvatarval,
      toedit,
      editcard,
      uploaded,
      changeuploaded,
      patchuser
    }
  }
})
</script>

<style scoped>
.mr{
  margin-right: 10px;
}
.sizeCtrl{
  width: 350px;
  height: 350px;
}
</style>
