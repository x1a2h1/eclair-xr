<script setup lang="ts">
import { reactive } from 'vue';

const state =reactive({
  loading:false
})

const method = {
  loading:()=>{
  state.loading = !state.loading;
  setTimeout(() => {
  state.loading = !state.loading;
  }, 3000);
  }
}
</script>
<template>
    <RepulsionEffect />

  <div class="m-4% flex flex-col items-start justify-between">
    <el-space wrap :size="40" class="mt-10">
      <el-card v-for="i in 20" :key="i" class="hover:-mt-2" body-class="w-80">
        <div class="flex">
          <div class="flex flex-col items-start">
            开发文档
            <div>点击查看详情</div>
          </div>
          <div class="m-1">
            <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
          </div>
        </div>
      </el-card>
    </el-space>

    <div id="热门列表" class="mt-10">
      <div class="flex">
        <div class="i-streamline-emojis:fire w-2em h-2em"/>
        <span class="font-size-6">热门课程</span>
        <el-button size="small" class="ml-2" @click="method.loading()" round><div class="i-mage:reload w-1em h-1em"></div>换一批</el-button>
      </div>
      <div class="mt-5">
        <CardList :loading="state.loading" />
      </div>
    </div>
    <!-- <a-scene>
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
    <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
    <a-sky color="#ECECEC"></a-sky>
  </a-scene> -->
  </div>
</template>
