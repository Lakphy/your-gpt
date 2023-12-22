<script setup lang="ts">
import ChatHistory from '@/components/ChatHistory.vue'
import ChatInput from '@/components/ChatInput.vue'
import ChatHeader from '@/components/ChatHeader.vue'
</script>

<template>
  <main class="HomeView">
    <ChatHeader />
    <ChatHistory />
    <ChatInput />
  </main>
</template>

<style>
.HomeView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
</style>
