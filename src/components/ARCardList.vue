<!-- ar 卡片 hover load 默认加载封面 -->
<script setup lang="ts">
import { reactive } from 'vue';


const state:any = reactive({
list: []
});
</script>
<template>
  <div v-if="state.list.length > 0" class="ar-card-list">
    <div v-for="item in state.list" :key="item.id" class="ar-card">
      <img :src="item.cover" alt="AR Card Cover" class="ar-card-cover">
      <div class="ar-card-content">
        <h3>标题</h3>
        <p>描述</p>
      </div>
    </div>
  </div>
</template>