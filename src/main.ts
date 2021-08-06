import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://1.116.134.48:3001/'

axios.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
