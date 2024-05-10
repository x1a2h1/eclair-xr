<script setup lang="ts">
import { reactive } from 'vue';
const state = reactive({
  loading: false
})

const method = {
  loading: () => {
    state.loading = !state.loading;
    setTimeout(() => {
      state.loading = !state.loading;
    }, 3000);
  }
}

</script>
<template>
  <RepulsionEffect>
  </RepulsionEffect>
  <div id="home" class="flex flex-col">
    <el-space wrap :size="40" class="flex justify-center">
      <!-- <el-card v-for="i in 4" :key="i" class="hover:-mt-2" body-class="w-80">
        <div class="flex">
          <div class="flex flex-col items-start">
            说明：{{ i }}
            <div>点击查看详情</div>
          </div>
          <div class="m-1">
            <div class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy" />
          </div>
        </div>
      </el-card> -->
    </el-space>

    <div id="hotvr" class="mt-10 flex flex-col xl:m-4%">
      <div class="flex">
        <div class="i-streamline-emojis:fire w-2em h-2em" />
        <span class="font-size-6">热门课程</span>
        <el-button size="small" class="ml-2" @click="method.loading()" round>
          <div class="i-mage:reload w-1em h-1em"></div>换一批
        </el-button>
      </div>
      <div class="mt-5 flex items-center justify-start">
        <CardList :loading="state.loading" type="vr" />
      </div>
    </div>
    <div class="mt-10 flex flex-col m-0 xl:m-4%">
      <div class="flex">
        <div class="i-streamline-emojis:fire w-2em h-2em"></div>
        <span class="font-size-6">AR+</span>
      </div>
      <div class="mt-5 flex items-center justify-start">
        <CardList :loading="false" type="ar" />
      </div>
    </div>
    <div class="mb-24">

    </div>
  </div>
</template>
