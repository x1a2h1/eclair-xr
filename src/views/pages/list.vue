<!-- 列表 -->
<script setup lang="ts">
import { reactive } from 'vue';


const state = reactive({
  tabsIndex:0,
  tabs:[
    {
      id:1,
      title:'VR',
    },
    {
      id:2,
      title:'AR',
    }
  ]
})
</script>
<template>
  <div class="m-0% sm:m-2% xl:m-4%">
    <div>
      <span class="font-size-6">资源列表</span>
    </div>
    <div class="flex">
      <div v-for="(item, index) in state.tabs" :key="index" :class="[  
    'w-20',  
    'text-center',  
    'bg-gray-400',  
    'm-4',
    'rounded-1',
    { 'bg-red': state.tabsIndex == index },
    { 'hover:bg-gray-500' : state.tabsIndex != index },
  ]"   @click="state.tabsIndex = index">{{ item.title }}</div>
    </div>
    <div class="flex items-center mt-2%">
      <card-list v-if="state.tabsIndex == 0" :loading="false"/>
      <div v-else class="text-center flex items-center justify-center w-full h-full"> 
      <el-empty :image-size="200" description="暂无资源"/>
      </div>
    </div>
    <div class="mt-2%">
      <el-pagination
        layout="prev, pager, next"
        :total="1"
      />
    </div>

    <!-- 列表内容 -->
  </div>
</template>