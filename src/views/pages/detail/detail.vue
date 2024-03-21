<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useDark } from '@vueuse/core'
import AFrame from 'aframe';

const state = reactive({
  isDark: useDark(),
  videoPlayer: false,
})
import { ElLoading } from 'element-plus'
onBeforeMount(async () => {
  await method.init()
})
const method = {
  init: async () => {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
      text: '加载场景中...',
      background: state.isDark ? '#000' : '#fff',
    })
    loadingInstance.close()
  },
  onclick: () => {
    console.log("clicked");
    var myVideo: any = document.querySelector('#surfer');
    var videoControls = document.querySelector('#videoControls');
    state.videoPlayer = !state.videoPlayer
    // 检查视频是否正在播放
    if (myVideo.paused) {
      myVideo.play();
      videoControls.setAttribute('src', '#pause');
    } else {
      myVideo.pause();
      videoControls.setAttribute('src', '#play')
    }
  }
}


</script>
<template>
  <!-- 自定义 vr按钮 -->
  <!-- <a-scene embedded class="w-200 h-100 z222">
      <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
    <a-box position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1"  color="#4CC3D9"></a-box>
    <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    <a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>

    <a-sky color="#ECECEC"></a-sky>
    <a-entity position="0 0 3.8">
        <a-camera></a-camera>
    </a-entity>
  </a-scene> -->
  <div class=" flex">
    <el-card class="w-full">
      <template #header>
        <div class="card-header">
          <span class="text-2xl font-bold">场景详情</span>
        </div>
      </template>
      <div class="shadow-lg">
        <a-scene avatar-renderer embedded class="w-full h-3xl">
          <a-assets>
            <img id="imggg" src="/favicon.png" alt="">
          </a-assets>
          <a-sphere position="0 1.25 -1" radius="1.25" color="#EF2D5E"></a-sphere>
          <a-box position="-1 0.5 1" rotation="0 45 0" width="1" height="1" depth="1" color="#4CC3D9"></a-box>
          <a-cylinder position="1 0.75 1" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
          <a-plane rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
          <a-sky color="#ECECEC"></a-sky>
          <a-entity position="0 0 3.8">
            <a-camera>
              <a-image src="imggg">

              </a-image>
            </a-camera>
          </a-entity>
        </a-scene>
      </div>
      <div class="mt-10">
        <div> 场景描述 description</div>
      </div>
    </el-card>
    <el-card class="ml-4%" style="min-width: 300px">
      <template #header>
        <div class="card-header">
          <span class="text-2xl font-bold">当前热度</span>
        </div>
      </template>
      <div>12313</div>
    </el-card>
  </div>
</template>

<style scoped></style>