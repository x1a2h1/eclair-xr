<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
const state = reactive({
  activeIndex: '2',
  isDark :useDark(),
  navData:[]
})
onMounted(async () => {
  await method.init()
})
const method = {
  init:()=>{
    console.log(useDark,useToggle);
  },
  handleSelect:()=>{}
}
</script>
<template>
  <el-menu
    :default-active="state.activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="method.handleSelect()">
    <el-menu-item index="0">lo1go</el-menu-item>
    <div style="flex-grow: 1;"/>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <div class=" flex items-center justify-center">
      <el-switch v-model="state.isDark">
        <template #active-action>亮</template>
        <template #inactive-action>暗</template>
      </el-switch>
    </div>
  </el-menu>
</template>