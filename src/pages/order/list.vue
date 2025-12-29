<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="我的订单" />
    
    <!-- 订单状态筛选 -->
    <view class="order-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 'all' }" 
        @click="switchTab('all')"
      >
        全部
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 'charging' }" 
        @click="switchTab('charging')"
      >
        充电中
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 'completed' }" 
        @click="switchTab('completed')"
      >
        已完成
      </view>
      <view 
        class="tab-item" 
        :class="{ active: currentTab === 'cancelled' }" 
        @click="switchTab('cancelled')"
      >
        已取消
      </view>
    </view>
    
    <!-- 订单列表 -->
    <view class="order-list">
      <view class="order-item" v-for="order in orderList" :key="order.id" @click="goToOrderDetail(order.id)">
        <view class="item-header">
          <view class="station-name">{{ order.stationName }}</view>
          <view class="order-status" :class="`status-${order.status}`">
            {{ getOrderStatusText(order.status) }}
          </view>
        </view>
        <view class="item-content">
          <view class="content-row">
            <text class="label">订单号:</text>
            <text class="value">{{ order.orderNo }}</text>
          </view>
          <view class="content-row">
            <text class="label">充电时间:</text>
            <text class="value">{{ order.chargeTime }}</text>
          </view>
          <view class="content-row">
            <text class="label">充电量:</text>
            <text class="value">{{ order.power }}度</text>
          </view>
          <view class="content-row">
            <text class="label">费用:</text>
            <text class="value price">¥{{ order.amount }}</text>
          </view>
        </view>
        <view class="item-footer">
          <text class="order-date">{{ order.createTime }}</text>
          <view class="footer-actions">
            <button 
              class="action-btn primary" 
              v-if="order.status === 'completed'"
              @click.stop="recharge(order.id)"
            >
              再次充电
            </button>
            <button 
              class="action-btn secondary" 
              v-if="order.status === 'charging'"
              @click.stop="viewChargeStatus(order.id)"
            >
              查看状态
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-section" v-if="orderList.length === 0">
      <image class="empty-img" src="/static/logo.png" mode="aspectFit"></image>
      <view class="empty-text">暂无订单信息</view>
      <view class="empty-desc">快去体验充电服务吧</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface Order {
  id: string
  orderNo: string
  stationName: string
  status: 'charging' | 'completed' | 'cancelled'
  chargeTime: string
  power: string
  amount: string
  createTime: string
}

const currentTab = ref('all')
const orderList = ref<Order[]>([
  {
    id: '1',
    orderNo: '202310120001',
    stationName: 'XX小区充电站',
    status: 'completed',
    chargeTime: '01:25:30',
    power: '12.5',
    amount: '8.60',
    createTime: '2023-10-12 14:30'
  },
  {
    id: '2',
    orderNo: '202310110002',
    stationName: 'YY商场充电站',
    status: 'charging',
    chargeTime: '00:45:20',
    power: '8.2',
    amount: '5.80',
    createTime: '2023-10-11 10:15'
  },
  {
    id: '3',
    orderNo: '202310100003',
    stationName: 'ZZ大厦充电站',
    status: 'completed',
    chargeTime: '02:10:15',
    power: '15.8',
    amount: '12.30',
    createTime: '2023-10-10 09:20'
  }
])

// 切换订单状态筛选
const switchTab = (tab: string) => {
  currentTab.value = tab
  // 这里可以添加筛选逻辑
}

// 获取订单状态文本
const getOrderStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    charging: '充电中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知状态'
}

// 跳转到订单详情
const goToOrderDetail = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/order/detail?id=${id}`
  })
}

// 再次充电
const recharge = (id: string) => {
  // @ts-ignore
  uni.showToast({
    title: '再次充电功能开发中',
    icon: 'none'
  })
}

// 查看充电状态
const viewChargeStatus = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/charge/status?id=${id}`
  })
}

// 下拉刷新
onMounted(() => {
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '我的订单'
  })
})
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 140rpx; /* 为底部导航栏留出空间 */
  box-sizing: border-box;
}

/* 订单状态筛选优化 */
.order-tabs {
  display: flex;
  background-color: $white;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 90;
  
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    font-weight: 500;
    color: $text-color-secondary;
    padding: 16rpx 0;
    transition: all 0.3s ease;
    position: relative;
    
    &:active {
      opacity: 0.7;
    }
    
    &.active {
      color: $primary-color;
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 6rpx;
        background: linear-gradient(90deg, $primary-color, #3399ff);
        border-radius: 3rpx;
        box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.35);
      }
    }
  }
}

/* 订单列表优化 */
.order-list {
  padding: 0 30rpx;
}

.order-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  transition: all 0.3s ease;
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    
    .station-name {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 400rpx;
    }
    
    .order-status {
      font-size: 26rpx;
      font-weight: 600;
      padding: 8rpx 20rpx;
      border-radius: 18rpx;
      
      &.status-charging {
        background-color: rgba(255, 153, 0, 0.15);
        color: $warning-color;
      }
      
      &.status-completed {
        background-color: rgba(25, 190, 107, 0.15);
        color: $success-color;
      }
      
      &.status-cancelled {
        background-color: rgba(150, 153, 160, 0.15);
        color: $gray-5;
      }
    }
  }
  
  .item-content {
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    border: 1rpx solid rgba(0, 0, 0, 0.06);
    
    .content-row {
      display: flex;
      align-items: center;
      margin-bottom: 18rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .label {
        font-size: 26rpx;
        color: $text-color-secondary;
        width: 120rpx;
        flex-shrink: 0;
      }
      
      .value {
        font-size: 26rpx;
        color: $text-color;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
        &.price {
          color: $error-color;
          font-weight: 600;
          font-size: 30rpx;
        }
      }
    }
  }
  
  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24rpx;
    border-top: 1rpx solid $border-color-light;
    
    .order-date {
      font-size: 24rpx;
      color: $text-color-tertiary;
    }
    
    .footer-actions {
      display: flex;
      gap: 16rpx;
      
      .action-btn {
        min-width: 140rpx;
        height: 60rpx;
        border-radius: 30rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0 24rpx;
        margin: 0;
        font-size: 26rpx;
        font-weight: 500;
        transition: all 0.3s ease;
        
        &:active {
          transform: scale(0.95);
        }
        
        &.primary {
          background: linear-gradient(135deg, $primary-color, #3399ff);
          color: $white;
          box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
        }
        
        &.secondary {
          background-color: rgba(0, 132, 255, 0.1);
          color: $primary-color;
          border: 1rpx solid rgba(0, 132, 255, 0.3);
        }
      }
    }
  }
}

/* 空状态优化 */
.empty-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
    opacity: 0.6;
  }
  
  .empty-text {
    font-size: 32rpx;
    font-weight: 500;
    color: $text-color-secondary;
    margin-bottom: 12rpx;
  }
  
  .empty-desc {
    font-size: 26rpx;
    color: $text-color-tertiary;
  }
}
</style>