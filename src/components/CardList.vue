<script lang="ts" setup>
import { reactive, ref } from 'vue';
import router from '../router';
import { onMounted } from 'vue';
import { TresCanvas } from '@tresjs/core';
import QrcodeVue from 'qrcode.vue';
import type { Level, RenderAs } from 'qrcode.vue'
const level = ref<Level>('M')
  const renderAs = ref<RenderAs>('svg')
export interface Props {
  loading: Boolean,
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: Boolean,
  type: String
})

const state: any = reactive({
  data: [],
  qrcode:'无权限访问！',
  activeMaskIndex: null,
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
    let path = ''
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
    if (isAndroid) {
      path = '/arscene/'
    } else if (isIOS) {
      path = '/1.usdz'
    }
    state.data = [
      {
        id: 1,
        title: 'AR场景',
        cover: '/ar-cover.png',
        description: 'AR场景',
        src: path
      }
    ]
  },
  go: (id: number) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端

    if (isAndroid) {
      let path = ''
      if (props.type == 'vr') {
        path = '/detail/'
      } else {
        path = '/arscene/'
      }
      router.push(path + id)
    } else if (isIOS) {

      router.replace('/1122333.usdz')
    }
  },
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
    <router-link v-if="type == 'ar'" v-for="(item, index) in state.data" :to="item.src">
      <div @click="state.activeMaskIndex = index;" 
        class="min-w-75 min-h-75 max-w-sm max-h-lg rounded-lg relative">
        <TresCanvas clear-color="#82DBC5">
          <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
          <TresMesh>
            <TresTorusGeometry :args="[1, 0.5, 24, 32]" />
            <TresMeshBasicMaterial color="#ff9300" />
          </TresMesh>
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
        <div v-if="state.activeMaskIndex == index"
          class="position-absolute top-0 cursor-pointer w-full h-full z-1 bg-black opacity-80">
          <div class=" flex justify-center items-center text-center mt-10">
            <qrcode-vue :value="'https://xr.dukui.cn/detail/arscene/' + item.id" :level="level" :size="150" :render-as="renderAs" />
          </div>
          <div class="flex justify-center items-center text-center">
          <span>请使用移动设备，或AR设备访问！</span>
            </div>
        </div>
      </div>
    </router-link>

  </el-space>
  <div v-if="state.data.length == 0" class="text-center flex items-center justify-center w-full h-full">
    <el-empty :image-size="200" description="暂无资源" />
  </div>
</template>