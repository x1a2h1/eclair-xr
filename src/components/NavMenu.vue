<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
const state = reactive({
  activeIndex: '2',
  isDark: useDark(),
  navData: []
})
onMounted(async () => {
  await method.init()
})
const method = {
  init: () => {
    console.log(useDark, useToggle);
  },
  handleSelect: () => { }
}
</script>
<template>
  <el-menu :default-active="state.activeIndex" class="w-full" mode="horizontal" :ellipsis="false"
    @select="method.handleSelect()">
    <el-menu-item>
      <RouterLink class="flex" to="/">
        <img class="w-45 h-auto" src="https://inis.cc/assets/imgs/logo-white.png" alt="logo" />
      </RouterLink>

    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <div class=" flex items-center justify-center">
      <el-switch v-model="state.isDark">
        <template #active-action>亮</template>
        <template #inactive-action>暗</template>
      </el-switch>
    </div>
  </el-menu>
</template>