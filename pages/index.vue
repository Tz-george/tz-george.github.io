<template>
  <div @click="onClick" class="container">
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import QrCode from '~/components/QRCode/index.vue';

const value = ref("hello world")

async function onClick() {
  value.value = "Hello world"
  console.log("hello world")

  const resp = await $fetch('/api/test')
  console.log(resp)
}
</script>

<style scoped lang="less">
.container {
  font-size: 32px;
}
</style>