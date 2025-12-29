<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="订单详情" />
    
    <!-- 订单状态 -->
    <view class="order-status-section">
      <view class="status-icon">
        <text class="iconfont icon-success"></text>
      </view>
      <view class="status-text">{{ getOrderStatusText(orderDetail.status) }}</view>
      <view class="status-desc">订单已完成</view>
    </view>
    
    <!-- 订单信息 -->
    <view class="order-info-section">
      <view class="info-item">
        <view class="item-label">订单号</view>
        <view class="item-value">{{ orderDetail.orderNo }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">电站名称</view>
        <view class="item-value">{{ orderDetail.stationName }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">充电桩</view>
        <view class="item-value">{{ orderDetail.chargerName }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">开始时间</view>
        <view class="item-value">{{ orderDetail.startTime }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">结束时间</view>
        <view class="item-value">{{ orderDetail.endTime }}</view>
      </view>
    </view>
    
    <!-- 费用明细 -->
    <view class="fee-detail-section">
      <view class="section-title">费用明细</view>
      <view class="fee-list">
        <view class="fee-item">
          <view class="item-label">电费</view>
          <view class="item-value">¥{{ orderDetail.electricityFee }}</view>
        </view>
        <view class="fee-item">
          <view class="item-label">服务费</view>
          <view class="item-value">¥{{ orderDetail.serviceFee }}</view>
        </view>
        <view class="fee-item total-item">
          <view class="item-label">合计</view>
          <view class="item-value price">¥{{ orderDetail.totalFee }}</view>
        </view>
      </view>
    </view>
    
    <!-- 充电详情 -->
    <view class="charge-detail-section">
      <view class="section-title">充电详情</view>
      <view class="detail-list">
        <view class="detail-item">
          <view class="item-label">充电时长</view>
          <view class="item-value">{{ orderDetail.chargeTime }}</view>
        </view>
        <view class="detail-item">
          <view class="item-label">充电电量</view>
          <view class="item-value">{{ orderDetail.power }}度</view>
        </view>
        <view class="detail-item">
          <view class="item-label">平均功率</view>
          <view class="item-value">{{ orderDetail.avgPower }}kW</view>
        </view>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-section">
      <button class="action-btn secondary-btn" @click="goToStation">再次充电</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface OrderDetail {
  id: string
  orderNo: string
  stationName: string
  chargerName: string
  status: 'completed' | 'cancelled'
  startTime: string
  endTime: string
  electricityFee: string
  serviceFee: string
  totalFee: string
  chargeTime: string
  power: string
  avgPower: string
}

const orderDetail = ref<OrderDetail>({
  id: '1',
  orderNo: '202310120001',
  stationName: 'XX小区充电站',
  chargerName: '充电桩01',
  status: 'completed',
  startTime: '2023-10-12 14:30',
  endTime: '2023-10-12 15:55',
  electricityFee: '7.50',
  serviceFee: '1.10',
  totalFee: '8.60',
  chargeTime: '01:25:30',
  power: '12.5',
  avgPower: '6.8'
})

// 获取订单状态文本
const getOrderStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || '未知状态'
}

// 跳转到电站
const goToStation = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/station/detail?id=1'
  })
}

// 获取页面参数
onMounted(() => {
  // @ts-ignore
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  const orderId = options.id || ''
  
  // 这里可以根据orderId请求详细信息
  console.log('订单ID:', orderId)
  
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '订单详情'
  })
})
</script>

<style lang="scss" scoped>
.container {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf2 100%);
  min-height: 100vh;
  padding-bottom: 60rpx;
}

/* 订单状态区域 */
.order-status-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72rpx 30rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 30rpx 30rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6rpx;
    background: linear-gradient(90deg, #19be6b, #52c41a, #73d13d);
  }
  
  .status-icon {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(25, 190, 107, 0.15), rgba(25, 190, 107, 0.08));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 36rpx;
    box-shadow: 0 12rpx 40rpx rgba(25, 190, 107, 0.2);
    animation: pulse 2s infinite;
    
    .icon-success {
      font-size: 72rpx;
      color: #19be6b;
      text-shadow: 0 4rpx 16rpx rgba(25, 190, 107, 0.3);
    }
  }
  
  .status-text {
    font-size: 40rpx;
    font-weight: 800;
    color: #19be6b;
    margin-bottom: 16rpx;
  }
  
  .status-desc {
    font-size: 30rpx;
    color: $text-color-secondary;
    font-weight: 600;
  }
}

/* 订单信息区域 */
.order-info-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40rpx 36rpx;
  margin: 0 30rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.6s ease-out 0.1s both;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    
    &:not(:last-child) {
      border-bottom: 2rpx dashed $border-color-light;
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 600;
      min-width: 140rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      font-weight: 700;
      text-align: right;
      flex: 1;
      word-break: break-all;
      line-height: 1.5;
    }
  }
}

/* 费用明细区域 */
.fee-detail-section,
.charge-detail-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40rpx 36rpx;
  margin: 0 30rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.6s ease-out 0.2s both;
  
  .section-title {
    font-size: 34rpx;
    font-weight: 700;
    color: $text-color;
    margin-bottom: 36rpx;
    position: relative;
    padding-left: 16rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rpx;
      height: 28rpx;
      background: linear-gradient(180deg, $primary-color, #3399ff);
      border-radius: 3rpx;
    }
  }
}

/* 费用列表 */
.fee-detail-section .fee-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  
  .fee-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
    border-radius: 16rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    
    &:not(:last-child) {
      border-bottom: none;
    }
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 600;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      font-weight: 700;
    }
    
    &.total-item {
      background: linear-gradient(135deg, rgba(237, 63, 20, 0.08), rgba(237, 63, 20, 0.04));
      border: 2rpx solid rgba(237, 63, 20, 0.2);
      margin-top: 12rpx;
      
      .item-label {
        font-size: 32rpx;
        color: $error-color;
      }
      
      .item-value {
        font-size: 36rpx;
        color: $error-color;
      }
    }
    
    .item-value.price {
      color: $error-color;
      font-weight: 800;
      background: linear-gradient(135deg, $error-color, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

/* 充电详情列表 */
.charge-detail-section {
  animation-delay: 0.3s;
  
  .detail-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
    
    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 36rpx 20rpx;
      background: linear-gradient(135deg, rgba(0, 132, 255, 0.08), rgba(0, 132, 255, 0.04));
      border-radius: 18rpx;
      border: 2rpx solid rgba(0, 132, 255, 0.2);
      box-shadow: 0 4rpx 16rpx rgba(0, 132, 255, 0.08);
      transition: all 0.3s ease;
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.15);
      }
      
      &:not(:last-child) {
        border-bottom: none;
      }
      
      .item-label {
        font-size: 26rpx;
        color: $text-color-secondary;
        font-weight: 600;
        margin-bottom: 16rpx;
      }
      
      .item-value {
        font-size: 36rpx;
        font-weight: 800;
        background: linear-gradient(135deg, $primary-color, #3399ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
}

/* 操作按钮区域 */
.action-section {
  padding: 0 30rpx;
  margin-top: 20rpx;
  animation: fadeInUp 0.6s ease-out 0.4s both;
  
  .action-btn {
    width: 100%;
    height: 96rpx;
    font-size: 32rpx;
    font-weight: 700;
    border-radius: 48rpx;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 12rpx 32rpx rgba(0, 132, 255, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    
    &.secondary-btn {
      background: linear-gradient(135deg, $primary-color, #3399ff);
      color: $white;
    }
    
    &:active {
      transform: scale(0.98) translateY(2rpx);
      box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.25);
    }
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(25, 190, 107, 0.4);
  }
  70% {
    box-shadow: 0 0 0 30rpx rgba(25, 190, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 190, 107, 0);
  }
}
</style>