<template>
  <div class="row">
    <div v-for="(column, index) in columnlist" :key="column.id" class="col-4 " :class="{'mb-4': index < 6}">
      <div class="card h-100 shadow-sm" v-if="index < 6">
        <img :src="column.avatar_url" :alt="column.title" class="card-img-top imgsize my-3">
        <div class="card-body text-center">
          <h5 class="card-title">{{column.name}}</h5>
          <p class="card-text text-left">{{column.introduction || ''}}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-primary">进入专栏</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { defTopicImage } from '../defaultConfig'

export interface ColumnProps{
  id:number;
  title:string;
  // eslint-disable-next-line camelcase
  avatar_url?:string;
  description:string;
}

export default defineComponent({
  name: 'ColmnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnlist = computed(() => {
      return props.list.map(f => {
        if (!f.avatar_url) {
          // f.avatar_url = 'https://img2.baidu.com/it/u=471165137,3149093985&fm=26&fmt=auto&gp=0.jpg'
          f.avatar_url = defTopicImage
        }
        return f
      })
    })
    return {
      columnlist
    }
  }
})
</script>

<style scoped>
.imgsize{
  height: 200px;
  height: 200px;
}
</style>
