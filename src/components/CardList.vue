<script lang="ts" setup>
import { reactive } from 'vue';
import router from '../router';
import { onMounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
export interface Props {
  loading: Boolean,
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: Boolean,
  type: String
})
console.log(props.loading);

const state: any = reactive({
  data: [],
  activeMaskIndex:null,
})

onMounted(async () => {
  await method.init()
})

const method = {
  init: async () => {
    if (props.type == 'vr') {
      await method.getVrData()
    } else if (props.type == 'ar') {
      await method.getArData()
    }
  },
  getVrData: async () => {
    state.data = [
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
  },
  getArData: async () => {
    state.data = [
      {
        id: 1,
        title: 'AR场景',
        cover: '/ar-cover.png',
        description: 'AR场景'
      }
    ]
  },
  go: (id: number) => {
    let path = ''
    if (props.type == 'vr') {
      path = '/detail/'
    } else {
      path = '/arscene/'
    }
    router.replace(path + id)
  }
}
</script>
<template>
  <el-space v-loading="loading" :size="45" class="flex items-center justify-center" wrap>
    <router-link v-if="type == 'vr'" v-for="(item, index) in state.data" :to="`/detail/${item.id}`"
      class="xxl:w-sm xxl:h-sm xl:w-18em xl:h-18em sm:w-12em sm:h-12em p-0 m-0 flex flex-col items-cente shadow rd-3 bg-gray-100 dark:bg-gray-900 decoration-none active:decoration-none text-gray-800 dark:text-white"
      :key="index">
      <div class="bg-cover w-full h-full overflow-hidden rd-t-3"
        :style="{ backgroundImage: 'url(' + item.cover + ')' }">
      </div>
      <div class="w-full h-20 bottom-0 flex p-3">
        <div class="-mt-10"><img :src="item.cover" width="50px" height="50px" alt="">
        </div>
        <div>
          <div class="ml-2">{{ item.title }}</div>
          <div class="text-gray-500">{{ item.description }}</div>
        </div>
      </div>
    </router-link>
    <div v-if="type == 'ar'" v-for="i in 4">
      <div @click="state.activeMaskIndex = i" class="min-w-75 min-h-75 max-w-sm max-h-lg rounded-lg relative">
        <TresCanvas clear-color="#82DBC5" class="z-99">
          <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
          <TresMesh>
            <TresTorusGeometry :args="[1, 0.5, 24, 32]" />
            <TresMeshBasicMaterial color="orange" />
          </TresMesh>
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
        <div v-if="state.activeMaskIndex == i" class="position-absolute top-0 cursor-pointer w-full h-full z-100 bg-black opacity-50">二维码</div>
      </div>
    </div>

  </el-space>
  <div v-if="state.data.length == 0" class="text-center flex items-center justify-center w-full h-full">
    <el-empty :image-size="200" description="暂无资源" />
  </div>
</template>