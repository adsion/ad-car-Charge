// 存储工具函数

/**
 * 设置本地存储
 * @param key 存储键名
 * @param value 存储值
 */
export function setStorage(key: string, value: any): void {
  try {
    // @ts-ignore
    uni.setStorageSync(key, value)
  } catch (error) {
    console.error('存储失败', error)
  }
}

/**
 * 获取本地存储
 * @param key 存储键名
 * @returns 存储值
 */
export function getStorage(key: string): any {
  try {
    // @ts-ignore
    return uni.getStorageSync(key)
  } catch (error) {
    console.error('获取存储失败', error)
    return null
  }
}

/**
 * 移除本地存储
 * @param key 存储键名
 */
export function removeStorage(key: string): void {
  try {
    // @ts-ignore
    uni.removeStorageSync(key)
  } catch (error) {
    console.error('移除存储失败', error)
  }
}

/**
 * 清空本地存储
 */
export function clearStorage(): void {
  try {
    // @ts-ignore
    uni.clearStorageSync()
  } catch (error) {
    console.error('清空存储失败', error)
  }
}

/**
 * 设置用户信息
 * @param userInfo 用户信息
 */
export function setUserInfo(userInfo: any): void {
  setStorage('userInfo', userInfo)
}

/**
 * 获取用户信息
 * @returns 用户信息
 */
export function getUserInfo(): any {
  return getStorage('userInfo')
}

/**
 * 设置token
 * @param token 访问令牌
 */
export function setToken(token: string): void {
  setStorage('token', token)
}

/**
 * 获取token
 * @returns 访问令牌
 */
export function getToken(): string {
  return getStorage('token') || ''
}

/**
 * 清空用户信息
 */
export function clearUserInfo(): void {
  removeStorage('userInfo')
  removeStorage('token')
}