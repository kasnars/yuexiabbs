import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Column from './views/ColumnDetail.vue'
import CreatePage from './views/CreatePage.vue'
import Regist from './views/Regist.vue'
import store from './store'
import QuestionDetail from './views/QuestionsDetail.vue'
import Edituser from './views/Edituser.vue'
import Reedit from './views/Reedit.vue'
import UserIndex from './views/UserIndex.vue'
import TopicsByList from './views/TopicsByList.vue'
import QuestionsByList from './views/QuestionsByList.vue'

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
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionDetail
    },
    {
      path: '/edituser',
      name: 'edituser',
      component: Edituser
    },
    {
      path: '/reedit/:id',
      name: 'reedit',
      component: Reedit
    },
    {
      path: '/userindex/:id',
      name: 'userindex',
      component: UserIndex
    },
    {
      path: '/topicslist',
      name: 'topicsbylist',
      component: TopicsByList
    },
    {
      path: '/questionslist',
      name: 'questionslist',
      component: QuestionsByList
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
