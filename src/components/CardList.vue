<script lang="ts" setup>
import { reactive } from 'vue';
import router from '../router';

export interface Props {
  loading:Boolean
}

const props = withDefaults(defineProps<Props>(), {
loading:Boolean
})
console.log(props.loading);

const state = reactive({
  data: [
    {
      id: 1,
      title: 'title1',
      cover: 'https://bot.gekj.net/upload/other/2024-02-07/20240207122449169.jpg',
      description: 'description1'
    },
    {
      id: 1,
      title: 'title1',
      cover: 'https://bot.gekj.net/upload/other/2024-02-07/20240207122449169.jpg',
      description: 'description1'
    },
    {
      id: 1,
      title: 'title1',
      cover: 'https://bot.gekj.net/upload/other/2024-02-07/20240207122449169.jpg',
      description: 'description1'
    }
  ]
})
const method = {
  go: (id:number)=>{
    router.push('/detail/'+id)
  }
}
</script>
<template>
  <el-space v-loading="loading" :size="45" wrap>
    <div v-for="(item, index) in state.data"
    @click="method.go(item.id)"
      class="w-sm h-75 p-0 m-0 flex flex-col  shadow rd-3 bg-gray-100 dark:bg-gray-900" :key="index">
      <div class="bg-cover w-full h-full overflow-hidden rd-t-3" :style="{ backgroundImage: 'url(' + item.cover + ')' }">
      </div>
      <div class="w-full h-20 bottom-0 flex p-3">
        <div class="-mt-10"><img :src="item.cover" width="50px" height="50px" alt="">
        </div>
        <div>
          <div class="ml-2">{{ item.title }}</div>
          <div>{{ item.description }}</div>
        </div>
      </div>
    </div>
  </el-space>
</template>