<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useDark } from '@vueuse/core'
const state = reactive({
  isDark: useDark(),
})
import { ElLoading } from 'element-plus'
onBeforeMount(async()=>{
  await method.init()
})
const method = {
  init: async() => {
    const loadingInstance = await ElLoading.service({
      fullscreen: true,
      text: '加载场景中...',
      background: state.isDark ? '#000' : '#fff',
    })

    setTimeout(() => {
      loadingInstance.close()
    }, 2000);
  }
}
</script>
<template>
<h1>详情页</h1>
</template>