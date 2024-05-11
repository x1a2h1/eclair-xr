<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const link = ref('');

const goToLink = () => {
  if (link.value) {
    router.push(link.value);
  }
};
</script>

<template>
  <div>
    <input v-model="link" type="text" placeholder="Enter link" />
    <button @click="goToLink">Go</button>
  </div>
</template>

<style scoped>
input {
  margin-bottom: 10px;
}
</style>