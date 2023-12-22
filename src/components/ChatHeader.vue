<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatHistoryStore, ChatRole } from '@/stores/chatHistory'
import ChatMessage from './ChatMessage.vue'
import { useChatStateStore, ChatState } from '@/stores/chatState'
import { storeToRefs } from 'pinia'
import { getGPTResponse } from '@/api/gpt'
import SettingInputItem from './SettingInputItem.vue'
import SettingSelectorItem from './SettingSelectorItem.vue'
import { GPTModelName, useChatConfigStore } from '@/stores/chatConfig'

const ChatConfigStore = useChatConfigStore()
const { chatConfig } = storeToRefs(ChatConfigStore)
const { setGPTToken, setGPTHost, setGPTModelName } = ChatConfigStore

const ChatHistoryStore = useChatHistoryStore()
const { chatHistory } = storeToRefs(ChatHistoryStore)
const { resetHistory, setPrompt } = ChatHistoryStore

const prompt = computed(() => chatHistory.value[0].message)

const showSettings = ref(true)

function handleNewChat() {
  resetHistory()
}
function handleSetGPTToken(e: InputEvent) {
  setGPTToken((e.target as HTMLInputElement).value)
}
function handleSetGPTHost(e: InputEvent) {
  setGPTHost((e.target as HTMLInputElement).value)
}
function handleSetPropmt(e: InputEvent) {
  setPrompt((e.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="ChatHeader" :style="showSettings ? 'max-height:52px' : 'max-height:300px'">
    <div class="header-bar">
      <Edit class="header-new" @click="handleNewChat" />
      <p class="header-title">Your-GPT</p>
      <Setting class="header-settings" @click="showSettings = !showSettings" />
    </div>
    <div
      class="setting-board"
      :style="!showSettings ? 'transform: scale(1) translateY(0);opacity: 1;' : ''"
    >
      <SettingInputItem
        label="GPT Token"
        :value="chatConfig.gptToken"
        :onChange="handleSetGPTToken"
      />
      <SettingInputItem label="GPT Host" :value="chatConfig.gptHost" :onChange="handleSetGPTHost" />
      <SettingInputItem label="GPT Prompt" :value="prompt" :onChange="handleSetPropmt" />
      <SettingSelectorItem
        label="GPT Model"
        :value="chatConfig.gptModelName"
        :onChange="setGPTModelName"
        :list="[
          GPTModelName.GPT_3_5_TURBO,
          GPTModelName.GPT_3_5_TURBO_16K,
          GPTModelName.GPT_4,
          GPTModelName.GPT_4_32K
        ]"
      />
    </div>
  </div>
</template>

<style scoped>
.ChatHeader {
  width: 100%;
  height: fit-content;
  background-color: #eee;
  border: #ddd 1px solid;
  box-sizing: border-box;
  transition: all 0.5s ease;
  overflow: hidden;
  .header-bar {
    width: 100%;
    height: 50px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 16px;
    padding: 0 20px;
    .header-new {
      width: 20px;
      cursor: pointer;
    }
    .header-title {
      margin-left: 10px;
      flex: 1;
    }
    .header-settings {
      width: 20px;
      cursor: pointer;
    }
  }
  .setting-board {
    width: 100%;
    padding: 10px 0px;
    transform: scale(0.9) translateY(-20px);
    opacity: 0.2;
    transition: all 0.5s ease;
  }
}
</style>
