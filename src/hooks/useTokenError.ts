import createMessage from '@/components/createMessage'

const useTokenError = () => {
  createMessage('登录有效期已经过期，请重新登录', 'error')
  localStorage.setItem('isLogin', 'false')
}

export default useTokenError
