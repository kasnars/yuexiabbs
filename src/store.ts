import { createStore, Commit } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
import axios from 'axios'

export interface ResponseType <P = Record<string, unknown>> {
  code: number;
  msg: string;
  data: P
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string
}
export interface UserProps {
  isLogin: boolean;
  name?: string;
  columnId?: number;
  _id?: string;
  password?: string;
  gender?: string;
  headline?: string;
  locations?: Array<any>;
  business?: string;
  employments?: Array<any>;
  educations?: Array<any>;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string
}
export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps,
  questions: any,
  topicsques: any,
  nowtopic: any,
  tempUrl: string,
  nowanswers: Array<any>
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
// const userlogin = () => {

// }

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: testData,
    posts: testPosts,
    user: { isLogin: false },
    questions: [],
    topicsques: [],
    nowtopic: [],
    tempUrl: '',
    nowanswers: []
  },
  mutations: {
    // login (state) {
    //   state.user = {
    //     ...state.user, isLogin: true, name: 'lyx', columnId: 1
    //   }
    // },
    login (state, data) {
      const token = data.token
      state.token = token
      localStorage.setItem('token', token)
      localStorage.setItem('isLogin', 'true')
      localStorage.setItem('name', data.name)
      localStorage.setItem('_id', data._id)
      state.user._id = data._id
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
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
    },
    fetchUser (state, data) {
      console.log(data, 'statedata')
      localStorage.setItem('isLogin', 'true')
      state.user.isLogin = true
      return data
    },
    setError (state, e:GlobalErrorProps) {
      state.error = e
    },
    getNowAnswers (state, data) {
      state.nowanswers = data
      console.log(data, 'commitdata')
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
    },
    login ({ commit }, payload) {
      return postAndCommit('/users/login', 'login', commit, payload)
    },
    fetchUser ({ commit }) {
      const userId = this.state.user._id
      getAndCommit(`/users/${userId}?fields=following;locations`, 'fetchUser', commit)
    },
    loginAndfetch ({ dispatch }, logindata) {
      return dispatch('login', logindata).then(() => {
        return dispatch('fetchUser')
      })
    },
    getNowAnswers ({ commit }, nowquesId) {
      axios.get(`/questions/${nowquesId}/answers`).then(res => {
        commit('getNowAnswers', res.data)
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
