<script setup lang="ts">
import { ChatRole } from '@/stores/chatHistory'
import { computed } from 'vue'

const props = defineProps<{
  content: string
  stamp?: number
  direction: 'left' | 'right'
  role: ChatRole
  totalTokens?: number
  totalCost?: number
}>()

const shouldRender = computed(() => {
  return props.role !== ChatRole.SYSTEM
})
</script>

<template>
  <div
    v-if="shouldRender"
    class="ChatMessage"
    :style="direction === 'left' ? 'flex-direction: row;' : 'flex-direction: row-reverse;'"
  >
    <div class="msg-avatar"></div>
    <div
      class="msg-content"
      :style="
        direction === 'left' ? 'background-color:white;' : 'background-color:#1b95ff; color:white;'
      "
    >
      {{ content }}
      <p class="token-notice" v-if="totalTokens && totalCost">
        tokens: {{ totalTokens }} | cost: ${{ totalCost }}
      </p>
    </div>
    <div class="msg-space"></div>
  </div>
</template>

<style scoped>
.ChatMessage {
  display: flex;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;

  .msg-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
  }
  .msg-content {
    line-height: 24px;
    font-size: 15px;
    margin: 0 10px;
    background-color: #ddd;
    border-radius: 20px;
    padding: 8px 10px;
    max-width: calc(100% - 100px);
    box-sizing: border-box;
    word-wrap: break-word;
    position: relative;

    .token-notice {
      display: none;
    }
    &:hover {
      .token-notice {
        display: block;
        font-size: 8px;
        color: #999;
        position: absolute;
        padding: 0 2px;
        margin-top: 10px;
        line-height: 12px;
      }
    }
  }
  .msg-space {
    min-width: 40px;
    height: 40px;
    flex: 1;
  }
}
</style>
