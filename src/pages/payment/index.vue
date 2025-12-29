<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="收银台" />
    
    <!-- 订单信息 -->
    <view class="order-info-section">
      <view class="info-item">
        <view class="item-label">订单号</view>
        <view class="item-value">{{ orderInfo.orderNo }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">充电站</view>
        <view class="item-value">{{ orderInfo.stationName }}</view>
      </view>
      <view class="info-item">
        <view class="item-label">充电桩</view>
        <view class="item-value">{{ orderInfo.chargerName }}</view>
      </view>
      <view class="info-item total-item">
        <view class="item-label">支付金额</view>
        <view class="item-value price">¥{{ orderInfo.amount }}</view>
      </view>
    </view>
    
    <!-- 支付方式 -->
    <view class="payment-method-section">
      <view class="section-title">选择支付方式</view>
      <view class="payment-list">
        <view 
          class="payment-item" 
          :class="{ active: selectedPayment === item.id }"
          v-for="item in paymentMethods" 
          :key="item.id"
          @click="selectPayment(item.id)"
        >
          <view class="item-icon">
            <image class="icon-img" :src="item.icon" mode="aspectFit"></image>
          </view>
          <view class="item-info">
            <view class="info-name">{{ item.name }}</view>
            <view class="info-desc">{{ item.desc }}</view>
          </view>
          <view class="item-check">
            <text class="iconfont icon-check"></text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 支付按钮 -->
    <view class="payment-action">
      <button 
        class="pay-btn" 
        :disabled="isPaying"
        @click="confirmPayment"
      >
        {{ isPaying ? '支付中...' : '立即支付 ¥' + orderInfo.amount }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'
import { pay } from '@/utils/payment'
import { useOrderStore } from '@/stores/order'

interface OrderInfo {
  id: string
  orderNo: string
  stationName: string
  chargerName: string
  amount: string
}

interface PaymentMethod {
  id: string
  name: string
  desc: string
  icon: string
}

const orderStore = useOrderStore()
const isPaying = ref(false)
const selectedPayment = ref('wechat')

const orderInfo = ref<OrderInfo>({
  id: '1',
  orderNo: '202310120001',
  stationName: 'XX小区充电站',
  chargerName: '充电桩01',
  amount: '8.60'
})

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wechat',
    name: '微信支付',
    desc: '推荐使用',
    icon: '/static/logo.png'
  },
  {
    id: 'alipay',
    name: '支付宝',
    desc: '',
    icon: '/static/logo.png'
  },
  {
    id: 'unionpay',
    name: '银联支付',
    desc: '',
    icon: '/static/logo.png'
  }
]

// 选择支付方式
const selectPayment = (id: string) => {
  selectedPayment.value = id
}

// 确认支付
const confirmPayment = async () => {
  if (isPaying.value) return
  
  isPaying.value = true
  
  try {
    // 调用支付接口
    const result = await pay({
      amount: parseFloat(orderInfo.value.amount),
      orderId: orderInfo.value.id,
      paymentMethod: selectedPayment.value
    })
    
    if (result.success) {
      // @ts-ignore
      uni.showToast({
        title: '支付成功',
        icon: 'success'
      })
      
      // 更新订单状态
      orderStore.updateOrderStatus(orderInfo.value.id, 'completed')
      
      // 跳转到支付成功页面
      setTimeout(() => {
        // @ts-ignore
        uni.redirectTo({
          url: '/pages/charge/status'
        })
      }, 1500)
    } else {
      // @ts-ignore
      uni.showToast({
        title: '支付失败',
        icon: 'none'
      })
    }
  } catch (error) {
    // @ts-ignore
    uni.showToast({
      title: '支付异常',
      icon: 'none'
    })
  } finally {
    isPaying.value = false
  }
}

// 获取页面参数
onMounted(() => {
  // @ts-ignore
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  const orderId = options.id || ''
  
  // 这里可以根据orderId请求订单详情
  console.log('订单ID:', orderId)
  
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '收银台'
  })
})
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}

/* 订单信息区域优化 */
.order-info-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 36rpx;
  margin: 20rpx 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    &.total-item {
      padding-top: 32rpx;
      margin-top: 8rpx;
      
      .item-label {
        font-size: 32rpx;
        font-weight: 600;
        color: $text-color;
      }
      
      .item-value {
        font-size: 42rpx;
        font-weight: 700;
        color: $error-color;
        text-shadow: 0 2rpx 4rpx rgba(237, 63, 20, 0.2);
      }
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 500;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      font-weight: 500;
      text-align: right;
      
      &.price {
        color: $error-color;
      }
    }
  }
}

/* 支付方式区域优化 */
.payment-method-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 36rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: $text-color;
    margin-bottom: 30rpx;
    position: relative;
    padding-left: 12rpx;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4rpx;
      height: 24rpx;
      background: linear-gradient(180deg, $primary-color, #3399ff);
      border-radius: 2rpx;
    }
  }
  
  .payment-list {
    .payment-item {
      display: flex;
      align-items: center;
      padding: 32rpx;
      margin-bottom: 20rpx;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 12rpx;
      border: 2rpx solid transparent;
      transition: all 0.3s ease;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &.active {
        border-color: $primary-color;
        background: linear-gradient(135deg, rgba(0, 132, 255, 0.08), rgba(0, 132, 255, 0.04));
        transform: translateY(-2rpx);
        box-shadow: 0 6rpx 20rpx rgba(0, 132, 255, 0.2);
        
        .item-check {
          .icon-check {
            color: $primary-color;
            font-size: 36rpx;
            animation: scaleIn 0.3s ease;
          }
        }
      }
      
      &:active {
        transform: scale(0.98);
      }
      
      .item-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 24rpx;
        background-color: $white;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        
        .icon-img {
          width: 60rpx;
          height: 60rpx;
        }
      }
      
      .item-info {
        flex: 1;
        
        .info-name {
          font-size: 30rpx;
          font-weight: 600;
          color: $text-color;
          margin-bottom: 8rpx;
        }
        
        .info-desc {
          font-size: 24rpx;
          color: $text-color-tertiary;
        }
      }
      
      .item-check {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .icon-check {
          font-size: 32rpx;
          color: $border-color;
          transition: all 0.3s ease;
        }
      }
    }
  }
}

/* 支付按钮区域优化 */
.payment-action {
  padding: 30rpx;
  margin: 40rpx 0;
  
  .pay-btn {
    width: 100%;
    height: 96rpx;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    color: $white;
    font-size: 34rpx;
    font-weight: 600;
    border-radius: 48rpx;
    border: none;
    box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.35);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.25);
    }
    
    &:disabled {
      background: linear-gradient(135deg, $gray-3, $gray-4);
      color: $gray-6;
      box-shadow: none;
      transform: none;
    }
  }
}

/* 动画效果 */
@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>