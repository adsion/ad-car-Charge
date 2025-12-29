// 请求工具函数

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
  timeout?: number
}

interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 统一请求函数
 * @param options 请求配置
 * @returns Promise
 */
export function request<T = any>(options: RequestOptions): Promise<ResponseData<T>> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      timeout: options.timeout || 10000,
      success: (res: any) => {
        const data = res.data as ResponseData<T>
        if (data.code === 200) {
          resolve(data)
        } else {
          // @ts-ignore
          uni.showToast({
            title: data.message || '请求失败',
            icon: 'none'
          })
          reject(data)
        }
      },
      fail: (err: any) => {
        // @ts-ignore
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

/**
 * GET请求
 */
export function get<T = any>(url: string, data?: any, header?: Record<string, string>): Promise<ResponseData<T>> {
  return request<T>({
    url,
    method: 'GET',
    data,
    header
  })
}

/**
 * POST请求
 */
export function post<T = any>(url: string, data?: any, header?: Record<string, string>): Promise<ResponseData<T>> {
  return request<T>({
    url,
    method: 'POST',
    data,
    header
  })
}

/**
 * PUT请求
 */
export function put<T = any>(url: string, data?: any, header?: Record<string, string>): Promise<ResponseData<T>> {
  return request<T>({
    url,
    method: 'PUT',
    data,
    header
  })
}

/**
 * DELETE请求
 */
export function del<T = any>(url: string, data?: any, header?: Record<string, string>): Promise<ResponseData<T>> {
  return request<T>({
    url,
    method: 'DELETE',
    data,
    header
  })
}