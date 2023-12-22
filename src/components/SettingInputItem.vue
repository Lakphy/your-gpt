<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatHistoryStore, ChatRole } from '@/stores/chatHistory'
import ChatMessage from './ChatMessage.vue'
import { useChatStateStore, ChatState } from '@/stores/chatState'
import { storeToRefs } from 'pinia'
import { getGPTResponse } from '@/api/gpt'
import { GPTCost, useChatConfigStore } from '@/stores/chatConfig'

const props = defineProps({
  label: String,
  value: String,
  onChange: Function
})

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
</script>

<template>
  <div class="SettingInputItem">
    <p class="setting-label">{{ props.label }}</p>
    <input class="setting-input" :value="props.value" @input="props.onChange" />
  </div>
</template>

<style scoped>
.SettingInputItem {
  width: 100%;
  height: 40px;
  background-color: #eee;
  box-sizing: border-box;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .setting-label {
    width: 100px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    font-weight: 500;
    color: #666;
  }
  .setting-input {
    flex: 1;
    line-height: 24px;
    font-size: 15px;
    height: 30px;
    border-radius: 10px;
    background-color: white;
    border: none;
    box-sizing: border-box;
    padding: 10px;
    font-size: 15px;
    color: #666;
    margin: 5px 0px;

    &:focus-visible {
      border: none;
      outline: none;
      outline-width: 0;
    }
  }
}
</style>
