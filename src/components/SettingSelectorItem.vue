<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatHistoryStore, ChatRole } from '@/stores/chatHistory'
import ChatMessage from './ChatMessage.vue'
import { useChatStateStore, ChatState } from '@/stores/chatState'
import { storeToRefs } from 'pinia'
import { getGPTResponse } from '@/api/gpt'
import { GPTCost, GPTModelName, useChatConfigStore } from '@/stores/chatConfig'

const props = defineProps<{
  label: string
  value: string
  onChange: Function
  list: Array<GPTModelName>
}>()

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

function handleSelect(e: any) {
  if (e.target.dataset.value) setGPTModelName(e.target.dataset.value)
}
</script>

<template>
  <div class="SettingSelectorItem">
    <p class="setting-label">{{ props.label }}</p>
    <div class="setting-selector" @click="handleSelect">
      <div
        v-for="item in list"
        :key="item"
        class="selector-item"
        :class="item === value ? 'selector-item selected' : 'selector-item'"
        :data-value="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.SettingSelectorItem {
  width: 100%;
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
  .setting-selector {
    margin: 5px 0px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    .selector-item {
      width: fit-content;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      border-radius: 10px;
      background-color: white;
      padding: 0px 10px;
      color: #666;
      margin-bottom: 10px;
      margin-right: 10px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      border: white 2px solid;
    }
    .selected {
      border: #1b95ff 2px solid;
      color: #1b95ff;
    }
  }
}
</style>
