<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import * as THREE from 'three';
import { reactive } from 'vue';

const state: any = reactive({
  gl: {
    alpha: true,
    shadows: true,
    powerPreference: "high-performance",
  },
  scene:{
    camera:new THREE.Vector3(0, 55,1.5),
  }
});

const method = {
  goAnchor: (id: string,offsetTop:number = 0) => {
    let anchor = document.getElementById(id);
    if (anchor){
      let rect = anchor.getBoundingClientRect();
      let top = rect.top + window.pageYOffset - offsetTop;
      window.scrollTo({
        top:top,
        behavior:'smooth'
      })
    }
  }
}
</script>
<template>
  <div class="repulsion-effect__content">
    <h2>eclair XR</h2>
    <h3>基于VR/AR在线上教育的应用</h3>
  </div>
  <div class="absolute bottom-10 w-full text-center z-99"><el-button @click="method.goAnchor('home',100)"
      type="success">查阅内容 <span class="i-material-symbols-arrow-cool-down-rounded"></span></el-button></div>
  <div class="repulsion-effect__bg" />
  <div id="canvas">
    <TresCanvas v-bind="state.gl">
      <TresPerspectiveCamera :position="state.scene.camera" :rotation-x="-1.57" :fov="20" />
      <!-- <OrbitControls /> -->
      <TresAmbientLight color="#ffffff" />

      <TresPointLight :color="'#fff000'" :intensity="5" :decay="0" :position="[0, 5, -20]" />
      <TresPointLight :color="'#CCFFFF'" :intensity="5" :decay="0" :position="[35, 5, 0]" />
      <TresPointLight :color="'#FFCCCC'" :intensity="5" :decay="0" :position="[-35, 5, 0]" />
      <TresPointLight :color="'#fff000'" :intensity="5" :decay="0" :position="[0, 5, 20]" />

      <TresSpotLight color="'#7bccd7'" :decay="0" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048"
        :position="[0, 25, 0]" />

      <TresRectAreaLight color="'#FF9999'" :decay="0" :width="1000" :height="1000" :position="[5, 20, 50]"
        :look-at="[0, 0, 0]" />
      <scene />
    </TresCanvas>
  </div>

</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');

#canvas {
  width: 100vw;
  height: 100vh;
}

.repulsion-effect__bg {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -99;
  pointer-events: none;
  @apply bg-white dark:bg-[#333333];
}

.repulsion-effect__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -11;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}

h3 {
  color: #FF6666;
  font-size: 3vw;
  font-family: 'Sacramento', cursive;
  font-weight: 400;
  margin: 0;
  line-height: 1;
}

h2 {
  font-size: 8vw;
  color: #CCFFFF;
  text-transform: uppercase;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  line-height: 1;
}
</style>