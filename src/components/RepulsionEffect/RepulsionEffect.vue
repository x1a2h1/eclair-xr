<script setup lang="ts">
import { TresCanvas, useSeek } from '@tresjs/core';
import { reactive } from 'vue';



const state: any = reactive({
  gl: {
    alpha: true,
    shadows: true,
    powerPreference: "high-performance",
  },
});
</script>
<template>
  <div class="repulsion-effect__content">
    <h2>PERRIN</h2>
    <h3>chocolaterie</h3>
  </div>
  <div class="repulsion-effect__bg" />
  <div id="canvas">
    <TresCanvas v-bind="state.gl">
      <TresPerspectiveCamera :position="[0, 65, 1.5]" :rotation-x="-1.57" :fov="20" />
      <!-- <OrbitControls /> -->
      <TresAmbientLight color="#ffffff" />

      <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, -20]" />
      <TresPointLight color="#79573e" :intensity="5" :decay="0" :position="[35, 5, 0]" />
      <TresPointLight color="#c27439" :intensity="5" :decay="0" :position="[-35, 5, 0]" />
      <TresPointLight color="#fff000" :intensity="5" :decay="0" :position="[0, 5, 20]" />

      <TresSpotLight color="#7bccd7" :decay="0" cast-shadow :shadow-mapSize-width="2048" :shadow-mapSize-height="2048"
        :position="[0, 25, 0]" />

      <TresRectAreaLight color="#341212" :decay="0" :width="1000" :height="1000" :position="[5, 20, 50]"
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
  @apply bg-[#d8bcac] dark:bg-[#d8b]
}

.repulsion-effect__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
}
</style>