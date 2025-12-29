import { defineStore } from 'pinia'

// 订单接口定义
interface Order {
  id: string
  orderNo: string
  stationName: string
  chargerName: string
  status: 'pending' | 'charging' | 'completed' | 'cancelled'
  startTime: string
  endTime: string
  chargeTime: string
  power: string
  amount: string
  createTime: string
}

interface OrderState {
  currentOrder: Order | null
  orderList: Order[]
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    currentOrder: null,
    orderList: []
  }),
  
  getters: {
    getCurrentOrder: (state) => state.currentOrder,
    getOrderList: (state) => state.orderList
  },
  
  actions: {
    // 设置当前订单
    setCurrentOrder(order: Order) {
      this.currentOrder = order
    },
    
    // 清除当前订单
    clearCurrentOrder() {
      this.currentOrder = null
    },
    
    // 添加订单到列表
    addOrderToList(order: Order) {
      this.orderList.unshift(order)
    },
    
    // 更新订单列表
    setOrderList(orders: Order[]) {
      this.orderList = orders
    },
    
    // 更新订单状态
    updateOrderStatus(orderId: string, status: Order['status']) {
      const order = this.orderList.find(item => item.id === orderId)
      if (order) {
        order.status = status
      }
      
      if (this.currentOrder && this.currentOrder.id === orderId) {
        this.currentOrder.status = status
      }
    }
  }
})