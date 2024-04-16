<script lang="ts" setup>
import { reactive } from 'vue';
import { useDark } from '@vueuse/core';

import AFRAME from 'aframe';
import 'aframe-blink-controls'
import 'aframe-extras';
import { onMounted } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';

import { useSettingsStore } from '../../../stores/SettingsStore';
const settings = useSettingsStore()

const state = reactive({
  isDark: useDark(),
  videoPlayer: false,
})

onMounted(async () => {
  await method.init()
})
const method = {
  init: async () => {
    const loadingInstance:any = ElLoading.service({
      fullscreen: true,
      text: '加载场景中...',
      background: state.isDark ? '#000' : '#fff',
    })
    let vd: any = navigator
    console.log("xr", vd.xr, vd.xr.ondevicechange);

    var scene = document.querySelector('a-scene');

    if (scene.hasLoaded) {
      console.log(12312312312);
    } else {
      scene.addEventListener('loaded', loadingInstance.close())
    }


    if (!AFRAME.utils.device.checkHeadsetConnected()) {
      ElNotification.warning({
        title: '设备未连接',
        message: '未识别到可用设备，可通过鼠标操作',
        showClose: false,
        offset: 50,
      })
    } else {
      ElNotification.success({
        title: '设备已连接',
        message: '已识别到可用设备，可通过手柄操作',
        showClose: false,
        offset: 50,
      })
    }



  },
  onclick: () => {
    var myVideo: any = document.querySelector('#surfer');
    // var videoControls: any = document.querySelector('#videoControls');
    state.videoPlayer = !state.videoPlayer
    // 检查视频是否正在播放
    if (myVideo.paused) {
      myVideo.play();
      console.log(state.videoPlayer);
      
    } else {
      myVideo.pause();
    }
  },
  trigerdown: () => {
    alert('按下扳机')
  },
  loaded: () => {
    console.log("loaded咯啊点咯9阿迪");
  },
  test: () => {
    console.log('test');
  }
}


</script>
<template>
  <div class="flex mt-2% xl:ml-4% xl:mr-4%">
    <el-card class="w-full">
      <template #header>
        <div class="card-header">
          <span class="text-2xl font-bold">场景详情</span>
        </div>
      </template>
      <div class="shadow-lg">
        <!-- 场景开始 -->
        <a-scene :stats="settings.aframeStatus" avatar-renderer embedded class="w-full sm:h-sm lg:h-lg xl:h-xl xxl:h-5xl">

          <a-assets>
            <a-asset-item id="school" src="/school.glb"></a-asset-item>
            <img id="imggg" src="/favicon.png" alt="">
            <img id="skyTexture" src="/background.jpg">
            <video id="surfer" src="/183279.mp4" loop="true"></video>
            <audio id="river" src="sound.mp3" preload="auto"></audio>
          </a-assets>

          <a-entity sound="src: #river"></a-entity>

          <a-entity glTF-model="#school"></a-entity>

          <a-sky id="bg" radius="90" src="#skyTexture" theta-length="180"></a-sky>
          <a-video v-if="state.videoPlayer" src="#surfer" width="6" height="1.5" position="0 1.5 6.05"
            rotation="0 -180 0"></a-video>
          <a-image id="videoControls" position="0 1 5" scale="1 1 1" rotation="0 0 0" play-pause
            @click="method.onclick">
          </a-image>
          
          <!-- <a-plane position="0 0 0" rotation="-90 0 0" width="40" height="40" color="#7BC8A4"></a-plane> -->
          <!-- handControls手部控制器 -->
          <a-entity id="camera-rig" movement-controls="camera: #head;" position="0 1 0">
            <a-entity id="head" look-controls="pointerLockEnabled: true" camera position="0 1.6 0">
            </a-entity>

            <a-entity 
            id="left-hand" 
            hand-controls="hand: left"
            </a-entity>

            <a-entity id="right-hand" 
              hand-controls="hand: right"
              laser-controls="hand: right"
              raycaster="far: 10; objects: [clickable]; showLine: true; lineColor: #5DEBD7;"
        position="0 12 0"
            >
            <a-sphere id="hand-right-collider"
          radius="0.2"
          visible="false"
          physx-body="type: kinematic; emitCollisionEvents: true">
        </a-sphere>
            </a-entity>
          </a-entity>
        </a-scene>

        <!-- 场景结束 -->

      </div>
      <div class="mt-10">
        <div class="bg-amber w-8em font-bold text-center rounded-2">场景描述</div>
        <div class="mt-4">
          <p>
            这是一个美丽的场景，展示了学校的建筑和环境。你可以看到教室、绿化。整个场景呈现出一种宁静和整洁的氛围，为学生提供了一个良好的学习环境。
          </p>
        </div>
      </div>
    </el-card>
    <el-card class="xl:ml-4% lg:ml-1%" style="min-width: 300px">
      <template #header>
        <div class="card-header">
          <span class="text-2xl font-bold">当前热度</span>
        </div>
      </template>
      <div>
        <div>标题</div>
        背景
        description
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>