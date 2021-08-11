import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://1.116.134.48:3001/'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  console.log(e.response)
  const { message } = e.response.data
  store.commit('setError', { status: true, message })
  store.commit('setLoading', false)
  return Promise.reject(message)
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
