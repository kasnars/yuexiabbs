import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number
}

export interface GlobalDataProps {
  loading: boolean
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps,
  questions: any,
  topicsques: any,
  nowtopic: any
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: testData,
    posts: testPosts,
    user: { isLogin: false },
    questions: [],
    topicsques: [],
    nowtopic: []
  },
  mutations: {
    login (state) {
      state.user = {
        ...state.user, isLogin: true, name: 'lyx', columnId: 1
      }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, data) {
      state.columns = data
    },
    fetchQuestions (state, data) {
      state.questions = data
    },
    fetchTopicsQues (state, data) {
      state.topicsques = data
      console.log(state.topicsques, 'state')
    },
    fetchNowTopic (state, data) {
      state.nowtopic = data
    },
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      const res = await axios.get('/topics')
      commit('fetchColumns', res.data)
    },
    fetchQuestions (context) {
      axios.get('/questions').then(res => {
        context.commit('fetchQuestions', res.data)
      })
    },
    fetchTopicsQues (context, topicId) {
      axios.get(`/topics/${topicId}/questions`).then(res => {
        context.commit('fetchTopicsQues', res.data)
        console.log(res.data, 'res')
      })
    },
    fetchNowTopic (context, topicId) {
      axios.get(`/topics/${topicId}`).then(res => {
        context.commit('fetchNowTopic', res.data)
      })
    }
  },
  getters: {
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    },
    getPostById: (state) => {
      return state.topicsques
    }
  }
})

export default store
