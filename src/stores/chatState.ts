import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export enum ChatState {
  READY,
  CHATING
}

export const useChatStateStore = defineStore('chatState', () => {
  const chatState = ref<ChatState>(ChatState.READY)
  const setChatState = (state: ChatState) => {
    chatState.value = state
  }

  return { chatState, setChatState }
})
