<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue';
import { useDark } from '@vueuse/core'
const state = reactive({
  isDark: useDark(),
})
import { ElLoading } from 'element-plus'
onBeforeMount(async()=>{
  method.init()
})
const method = {
  init: () => {
    const loadingInstance = ElLoading.service({
      fullscreen: true,
      text: '加载场景中...',
      background: state.isDark ? '#000' : '#fff',
    })

    setTimeout(() => {
      loadingInstance.close()
    }, 5000);
  }
}
</script>
<template>{{ $route.params.id }}</template>