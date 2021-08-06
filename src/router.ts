import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Column from './views/ColumnDetail.vue'
import CreatePage from './views/CreatePage.vue'
import store from './store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { donotneedtoLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: Column
    },
    {
      path: '/createpage',
      name: 'createpage',
      component: CreatePage,
      meta: { requiredLogin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.donotneedtoLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
