<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useSettingsStore } from '../stores/SettingsStore'
const settings = useSettingsStore()
const state = reactive({
  activeIndex: '2',
  isDark: useDark(),
  navData: [],
  showSetting: false,
})
onMounted(async () => {
  await method.init()
})
const method = {
  init: async() => {
    console.log(useDark, useToggle);
  },
  handleSelect: () => { },
  openSetting: () => {
    // 打开设置
    state.showSetting = true
    let vd = window.navigator?.xr
    console.log('显示连接设备', vd);

  }
}
</script>
<template>
  <div class="z999 bg-white dark:bg-black">
    <el-menu :default-active="state.activeIndex" mode="horizontal" :ellipsis="false" @select="method.handleSelect()">
      <el-menu-item>
        <RouterLink class="flex" to="/">
          <img class="w-25 h-auto" src="/logo.png" alt="logo" />
        </RouterLink>

      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1"><RouterLink to='/'>课程</RouterLink></el-menu-item>
      <el-menu-item index="2">AR</el-menu-item>
      <div class=" flex items-center justify-center pr-4%">
        <el-switch v-model="state.isDark">
          <template #active-action>
            <div class="i-material-symbols-dark-mode w-2em h-2em" />
          </template>
          <template #inactive-action>
            <div class="i-material-symbols-light-mode" />
          </template>
        </el-switch>
        <div class="pl-4">
          <div @click="method.openSetting()" class="i-material-symbols-settings-applications-rounded w-2em h-2em" />
          <el-drawer v-model="state.showSetting" title="设置" size="300">
            性能面板 <el-switch
    v-model="settings.aframeStatus"
    inline-prompt
    active-text="启用"
    inactive-text="禁用"
  />
          </el-drawer>
        </div>
      </div>
    </el-menu>
  </div>

</template>