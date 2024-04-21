<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../../router';


onMounted(() => {
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
      
      router.replace('/')
    }
  }
}
</script>
<template>
关于ar平台
</template>