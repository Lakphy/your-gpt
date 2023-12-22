<script setup lang="ts">
import { useChatHistoryStore } from '@/stores/chatHistory'
import ChatMessage from './ChatMessage.vue'
import { storeToRefs } from 'pinia'
import { ref, watch, nextTick } from 'vue'

const ChatHistoryStore = useChatHistoryStore()
const { chatHistory } = storeToRefs(ChatHistoryStore)

const ChatHistoryRef = ref<HTMLElement | null>(null)

watch(chatHistory.value, () => {
  nextTick(() => {
    if (ChatHistoryRef.value) {
      ChatHistoryRef.value.scrollTop = ChatHistoryRef.value.scrollHeight
    }
  })
})
</script>

<template>
  <div class="ChatHistory" ref="ChatHistoryRef">
    <ChatMessage
      v-for="msg in chatHistory"
      :key="msg.stamp"
      :stamp="msg.stamp"
      :content="msg.message"
      :direction="msg.role === 'user' ? 'right' : 'left'"
      :role="msg.role"
      :totalTokens="msg.totalTokens"
      :totalCost="msg.totalCost"
    ></ChatMessage>
  </div>
</template>

<style scoped>
.ChatHistory {
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}

.ChatHistory::-webkit-scrollbar {
  width: 0px;
}
</style>
