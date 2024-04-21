<script lang="ts" setup>
import { reactive } from 'vue';
import router from '../router';

export interface Props {
  loading: Boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: Boolean
})
console.log(props.loading);

const state = reactive({
  data: [
    {
      id: 1,
      title: '学校场景',
      cover: '/school-cover.png',
      description: '教室交互场景'
    },
    {
      id: 2,
      title: 'demo场景',
      cover: 'hall-cover.png',
      description: 'VR大厅'
    }
  ]
})
const method = {
  go: (id: number) => {
    router.replace('/detail/' + id)
  }
}
</script>
<template>
  <el-space v-loading="loading" :size="45" class="flex items-center justify-center" wrap>
    <div v-for="(item, index) in state.data" @click="method.go(item.id)"
      class="xxl:w-sm xxl:h-sm xl:w-18em xl:h-18em sm:w-12em sm:h-12em p-0 m-0 flex flex-col items-cente shadow rd-3 bg-gray-100 dark:bg-gray-900" :key="index">
      <div class="bg-cover w-full h-full overflow-hidden rd-t-3"
        :style="{ backgroundImage: 'url(' + item.cover + ')' }">
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