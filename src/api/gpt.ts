import type { GPTModelName } from '@/stores/chatConfig'
import type { ChatMessage } from '@/stores/chatHistory'
import axios from 'axios'

export const getGPTResponse = async (props: {
  messages: ChatMessage[]
  host: string
  token: string
  model: GPTModelName
}) => {
  const GPTAxios = axios.create({
    baseURL: props.host,
    headers: {
      Authorization: `Bearer ${props.token}`
    }
  })
  const { data } = await GPTAxios.post('/chat/completions', {
    model: props.model,
    messages: props.messages.map((msg: ChatMessage) => ({ role: msg.role, content: msg.message }))
  })
  return data
}
