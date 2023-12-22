import { defineStore } from 'pinia'
import { ref } from 'vue'

export enum ChatRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant'
}
export interface ChatMessage {
  role: ChatRole
  message: string
  stamp?: number
  totalTokens?: number
  totalCost?: number
}

const GLOBAL_PROMPT = '你是一个能干的助手.'

export const useChatHistoryStore = defineStore('chatHistory', () => {
  const chatHistory = ref<ChatMessage[]>([
    { role: ChatRole.SYSTEM, message: GLOBAL_PROMPT, stamp: 0 }
  ])
  function addMessage(message: ChatMessage) {
    chatHistory.value.push(message)
  }
  function resetHistory() {
    if (chatHistory.value.length > 0 && chatHistory.value[0].role === ChatRole.SYSTEM) {
      chatHistory.value.splice(1)
    } else {
      chatHistory.value = [
        {
          role: ChatRole.SYSTEM,
          message: GLOBAL_PROMPT,
          stamp: 0
        }
      ]
    }
  }
  function setPrompt(message: string) {
    if (chatHistory.value.length > 0 && chatHistory.value[0].role === ChatRole.SYSTEM) {
      chatHistory.value[0].message = message
    } else {
      chatHistory.value = [{ role: ChatRole.SYSTEM, message, stamp: 0 }]
    }
  }

  return { chatHistory, addMessage, resetHistory, setPrompt }
})
