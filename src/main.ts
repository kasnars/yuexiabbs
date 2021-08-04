import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// const routerHistory = createWebHistory()
// const router = createRouter({
//   history: routerHistory,
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/login',
//       name: 'login',
//       component: Login
//     },
//     {
//       path: '/column/:id',
//       name: 'column',
//       component: Column
//     }
//   ]
// })
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
