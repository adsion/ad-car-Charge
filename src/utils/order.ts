// 订单管理工具函数

export type OrderStatus = 'pending' | 'charging' | 'completed' | 'cancelled'

export interface Order {
  id: string
  orderNo: string
  stationName: string
  chargerName: string
  status: OrderStatus
  startTime: string
  endTime: string
  chargeTime: string
  power: string
  amount: string
  createTime: string
}

/**
 * 创建订单
 * @param params 订单参数
 * @returns Promise
 */
export function createOrder(params: any): Promise<{ success: boolean; data: Order }> {
  return new Promise((resolve) => {
    // 模拟创建订单
    setTimeout(() => {
      const order: Order = {
        id: Date.now().toString(),
        orderNo: 'ORD' + Date.now(),
        stationName: params.stationName || '默认电站',
        chargerName: params.chargerName || '默认充电桩',
        status: 'pending',
        startTime: new Date().toLocaleString(),
        endTime: '',
        chargeTime: '00:00:00',
        power: '0',
        amount: '0.00',
        createTime: new Date().toLocaleString()
      }
      
      resolve({
        success: true,
        data: order
      })
    }, 1000)
  })
}

/**
 * 获取订单列表
 * @param params 查询参数
 * @returns Promise
 */
export function getOrderList(params: any): Promise<{ success: boolean; data: Order[] }> {
  return new Promise((resolve) => {
    // 模拟订单列表数据
    const orders: Order[] = [
      {
        id: '1',
        orderNo: '202310120001',
        stationName: 'XX小区充电站',
        chargerName: '充电桩01',
        status: 'completed',
        startTime: '2023-10-12 14:30',
        endTime: '2023-10-12 15:55',
        chargeTime: '01:25:30',
        power: '12.5',
        amount: '8.60',
        createTime: '2023-10-12 14:30'
      },
      {
        id: '2',
        orderNo: '202310110002',
        stationName: 'YY商场充电站',
        chargerName: '充电桩02',
        status: 'charging',
        startTime: '2023-10-11 10:15',
        endTime: '',
        chargeTime: '00:45:20',
        power: '8.2',
        amount: '5.80',
        createTime: '2023-10-11 10:15'
      }
    ]
    
    resolve({
      success: true,
      data: orders
    })
  })
}

/**
 * 获取订单详情
 * @param orderId 订单ID
 * @returns Promise
 */
export function getOrderDetail(orderId: string): Promise<{ success: boolean; data: Order }> {
  return new Promise((resolve) => {
    // 模拟订单详情数据
    const order: Order = {
      id: orderId,
      orderNo: '202310120001',
      stationName: 'XX小区充电站',
      chargerName: '充电桩01',
      status: 'completed',
      startTime: '2023-10-12 14:30',
      endTime: '2023-10-12 15:55',
      chargeTime: '01:25:30',
      power: '12.5',
      amount: '8.60',
      createTime: '2023-10-12 14:30'
    }
    
    resolve({
      success: true,
      data: order
    })
  })
}

/**
 * 取消订单
 * @param orderId 订单ID
 * @returns Promise
 */
export function cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    // 模拟取消订单
    setTimeout(() => {
      resolve({
        success: true,
        message: '订单已取消'
      })
    }, 500)
  })
}