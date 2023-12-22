import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

// @ts-ignore
const GPT_TOKEN = process.env.GPT_TOKEN || ''
// @ts-ignore
const GPT_HOST = process.env.GPT_HOST || ''

export enum GPTModelName {
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_3_5_TURBO_16K = 'gpt-3.5-turbo-16k',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k'
}
export const GPTCost = new Map<GPTModelName, { prompt: number; completion: number }>([
  [GPTModelName.GPT_3_5_TURBO, { prompt: 0.00225, completion: 0.003 }],
  [GPTModelName.GPT_3_5_TURBO_16K, { prompt: 0.0045, completion: 0.006 }],
  [GPTModelName.GPT_4, { prompt: 0.045, completion: 0.09 }],
  [GPTModelName.GPT_4_32K, { prompt: 0.09, completion: 0.18 }]
])

interface ChatConfig {
  gptToken: string
  gptHost: string
  gptModelName: GPTModelName
}

export const useChatConfigStore = defineStore('chatConfig', () => {
  const chatConfig = reactive<ChatConfig>({
    gptToken: GPT_TOKEN,
    gptHost: GPT_HOST,
    gptModelName: GPTModelName.GPT_3_5_TURBO
  })
  function setGPTToken(token: string) {
    chatConfig.gptToken = token
  }
  function setGPTHost(host: string) {
    chatConfig.gptHost = host
  }
  function setGPTModelName(modelName: GPTModelName) {
    chatConfig.gptModelName = modelName
  }
  return { chatConfig, setGPTToken, setGPTHost, setGPTModelName }
})
