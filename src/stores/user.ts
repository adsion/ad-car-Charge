import { defineStore } from 'pinia'

interface UserInfo {
  id: string
  name: string
  phone: string
  avatar: string
  level: string
}

interface UserState {
  token: string
  userInfo: UserInfo | null
  isLogin: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    isLogin: false
  }),
  
  getters: {
    isLoggedIn: (state) => state.isLogin,
    getUserInfo: (state) => state.userInfo
  },
  
  actions: {
    // 设置用户信息
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
      this.isLogin = true
    },
    
    // 设置token
    setToken(token: string) {
      this.token = token
    },
    
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = null
      this.isLogin = false
    },
    
    // 模拟登录
    async login(phone: string, password: string) {
      // 模拟登录接口调用
      return new Promise((resolve) => {
        setTimeout(() => {
          this.setToken('fake_token_' + Date.now())
          this.setUserInfo({
            id: '1',
            name: '张三',
            phone: phone,
            avatar: '/static/logo.png',
            level: '普通用户'
          })
          resolve({
            success: true,
            message: '登录成功'
          })
        }, 1000)
      })
    }
  }
})