import { createApp } from 'vue'
import store from '@/store'
import Message from '../components/Message.vue'
export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message, type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  setTimeout(() => {
    messageInstance.unmount()
    document.removeChild(mountNode)
    store.commit('setError', false)
  }, timeout)
}

export default createMessage
