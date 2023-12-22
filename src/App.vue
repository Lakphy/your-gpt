<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style scoped>
.app-wrapper {
  margin-left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  max-width: 800px;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: 0 0 10px #000;
  overflow: hidden;
  background-color: #eee;
}
</style>
