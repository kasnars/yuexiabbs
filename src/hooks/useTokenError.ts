import createMessage from '@/components/createMessage'
import store from '@/store'

const useTokenError = () => {
  createMessage('登录有效期已经过期，请重新登录', 'error')
  localStorage.setItem('isLogin', 'false')
  store.state.user.isLogin = false
}

export default useTokenError
