// 支付工具函数

/**
 * 模拟支付接口
 * @param params 支付参数
 * @returns Promise
 */
export function pay(params: {
  amount: number
  orderId: string
  paymentMethod: string
}): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    // 模拟支付过程
    setTimeout(() => {
      // 这里可以集成真实的支付SDK
      console.log('支付参数:', params)
      
      // 模拟支付成功
      resolve({
        success: true,
        message: '支付成功'
      })
    }, 2000)
  })
}

/**
 * 微信支付
 * @param params 支付参数
 */
export function wechatPay(params: any): Promise<any> {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.requestPayment({
      provider: 'wxpay',
      orderInfo: params,
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        reject(err)
      }
    })
  })
}

/**
 * 支付宝支付
 * @param params 支付参数
 */
export function alipay(params: any): Promise<any> {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    // @ts-ignore
    uni.requestPayment({
      provider: 'alipay',
      orderInfo: params,
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        reject(err)
      }
    })
  })
}