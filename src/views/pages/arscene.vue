<script setup lang="ts">
import router from '../../router';
import 'aframe';
import { onBeforeMount } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { reactive,ref } from 'vue';
import type { Level, RenderAs } from 'qrcode.vue'
  
  const level = ref<Level>('M')
  const renderAs = ref<RenderAs>('svg')
const state = reactive({
  dialog:false,
  qrcode:'无权限访问！',
})
state.qrcode = "https://192.168.110.72:5173/#" + router.currentRoute.value.fullPath;

onBeforeMount(() => {
  methods.init();
});
const methods = {
  init:()=>{
    // 初始化，判断设备是否为移动设备.or AR 眼镜
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if (flag)
    {
      console.log("移动端",flag);
    }else {
      console.log("AR眼镜",flag);
  console.log(router);
      state.dialog = true;
    }
  },
  replaceHome:()=>{
    router.replace('/')
  }
}
</script>

<template>
<el-dialog
    v-model="state.dialog"
    title="当前设备不受支持"
    width="500"
    align-center
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <span>请使用移动设备，或AR设备访问！</span>
    <div class="text-center">
    <qrcode-vue :value="state.qrcode" :level="level" :size="150" :render-as="renderAs" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="methods.replaceHome()">
          返回
        </el-button>
      </div>
    </template>
  </el-dialog>
<a-scene v-if="!state.dialog" ar avatar-renderer>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
</template>