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
state.qrcode = "https://xr.dukui.cn" + router.currentRoute.value.fullPath;

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
      // state.dialog = true;
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

  <!-- 3D 场景 -->
  <a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false' renderer='antialias: true; alpha: true'>
    <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
    <a-entity material='color: red' geometry='primitive: box' gps-new-entity-place="latitude: 29.693086; longitude: 115.667849" scale="10 10 10"></a-entity>
</a-scene>
</template>