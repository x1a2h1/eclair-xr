<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { onMounted,onBeforeMount,ref } from 'vue';
let loading:any = ref(null)
onBeforeMount(() => {
  loading = ElLoading.service({
    fullscreen: true,
    text: 'Loading...',
    background: '#CCE5FF',
  })
})

onMounted(()=>{
  loading.close()
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  padding: 0; 
}
</style>
