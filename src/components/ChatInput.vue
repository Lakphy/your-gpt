<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatHistoryStore, ChatRole } from '@/stores/chatHistory'
import ChatMessage from './ChatMessage.vue'
import { useChatStateStore, ChatState } from '@/stores/chatState'
import { storeToRefs } from 'pinia'
import { getGPTResponse } from '@/api/gpt'
import { GPTCost, useChatConfigStore } from '@/stores/chatConfig'

const ChatHistoryStore = useChatHistoryStore()
const { chatHistory } = storeToRefs(ChatHistoryStore)
const { addMessage } = ChatHistoryStore

const ChatStateStore = useChatStateStore()
const { chatState } = storeToRefs(ChatStateStore)
const { setChatState } = ChatStateStore

const ChatConfigStore = useChatConfigStore()
const { chatConfig } = storeToRefs(ChatConfigStore)
const { setGPTToken, setGPTHost, setGPTModelName } = ChatConfigStore

const inputMessage = ref('')

const handleSend = () => {
  addMessage({
    role: ChatRole.USER,
    message: inputMessage.value,
    stamp: Date.now()
  })
  inputMessage.value = ''
  setChatState(ChatState.CHATING)
  getGPTResponse({
    messages: chatHistory.value,
    host: chatConfig.value.gptHost,
    token: chatConfig.value.gptToken,
    model: chatConfig.value.gptModelName
  }).then((res) => {
    addMessage({
      role: ChatRole.ASSISTANT,
      message: res.choices[0].message.content,
      stamp: res.created,
      totalTokens: res.usage.total_tokens,
      totalCost:
        (res.usage.prompt_tokens *
          (GPTCost.get(chatConfig.value.gptModelName)?.prompt || (0 as number)) +
          res.usage.completion_tokens *
            (GPTCost.get(chatConfig.value.gptModelName)?.completion || (0 as number))) /
        1000
    })
    setChatState(ChatState.READY)
  })
}

const inputDisabled = computed(() => {
  // return true
  return chatState.value === ChatState.CHATING
})
</script>

<template>
  <div class="ChatInpput">
    <input class="input-inner" type="text" v-model="inputMessage" :disabled="inputDisabled" />
    <button
      class="input-btn"
      :disabled="inputDisabled"
      @click="handleSend"
      :style="inputDisabled ? 'cursor:no-drop' : ''"
      :key="'input-btn'"
    >
      <p v-if="!inputDisabled" class="input-btn-text">Send</p>
      <div v-if="inputDisabled" class="input-loading">
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
        <div class="loading-dot"></div>
      </div>
    </button>
    <p class="input-tip">Designed by Lakphy</p>
  </div>
</template>

<style scoped>
.ChatInpput {
  width: 100%;
  height: 80px;
  background-color: #eee;
  border: #ddd 1px solid;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  .input-inner {
    position: absolute;
    width: calc(100% - 110px);
    line-height: 24px;
    font-size: 15px;
    height: 30px;
    border-radius: 10px;
    background-color: white;
    border: none;
    box-sizing: border-box;
    padding: 10px;
    font-size: 15px;
    transition: all 0.6s;
    &:focus-visible {
      border: none;
      outline: none;
      outline-width: 0;
    }
  }
  .input-inner:disabled {
    width: 0;
    padding: 0;
    margin-left: 50%;
  }
  .input-btn {
    position: absolute;
    margin-left: calc(100% - 100px);
    width: 80px;
    height: 30px;
    border-radius: 10px;
    background-color: #1b95ff;
    color: white;
    border: none;
    font-size: 15px;
    cursor: pointer;
    display: inline-block;
    transition: all 1s;
    &:active {
      background-color: #0f6db5;
    }
    .input-btn-text {
      color: white;
      font-size: 15px;
    }
    .input-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      .loading-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: white;
        margin: 0 5px;
        animation: loading 1s infinite ease;
        &:nth-child(1) {
          animation-delay: 0s;
        }
        &:nth-child(2) {
          animation-delay: 0.2s;
        }
        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }
  }
  .input-btn:disabled {
    cursor: no-drop;
    margin-left: calc(50% - 10px);
    transform: translateX(-50%);
  }
  .input-tip {
    font-size: 12px;
    color: #aaa;
    margin: 0;
    padding: 0;
    line-height: 30px;
    height: 30px;
    text-align: center;
    margin-top: 35px;
  }
}
@keyframes loading {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
