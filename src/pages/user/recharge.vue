<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="充值中心" />
    
    <!-- 当前余额 -->
    <view class="balance-section">
      <view class="balance-label">当前余额</view>
      <view class="balance-amount">¥{{ currentBalance }}</view>
    </view>
    
    <!-- 充值金额选择 -->
    <view class="recharge-amount-section">
      <view class="section-title">充值金额</view>
      <view class="amount-grid">
        <view 
          class="amount-card" 
          :class="{ active: selectedAmount === item.amount }"
          v-for="item in rechargeAmounts" 
          :key="item.amount"
          @click="selectAmount(item.amount)"
        >
          <view class="amount-value">¥{{ item.amount }}</view>
          <view class="amount-gift" v-if="item.gift">
            <text class="gift-icon">🎁</text>
            <text class="gift-text">送¥{{ item.gift }}</text>
          </view>
        </view>
        <view class="amount-card custom-card" :class="{ active: selectedAmount === 0 }">
          <input 
            class="custom-input" 
            type="digit" 
            placeholder="自定义金额"
            placeholder-style="color: $text-color-tertiary; font-size: 28rpx;"
            v-model="customAmount"
            @input="handleCustomAmount"
          />
        </view>
      </view>
    </view>
    
    <!-- 支付方式 -->
    <view class="payment-method-section">
      <view class="section-title">支付方式</view>
      <view class="payment-list">
        <view class="payment-item" 
          :class="{ active: selectedPayment === item.id }"
          v-for="item in paymentMethods" 
          :key="item.id"
          @click="selectPayment(item.id)"
        >
          <view class="item-icon" :class="item.id">
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
    
    <!-- 充值按钮 -->
    <view class="recharge-action">
      <button 
        class="recharge-btn" 
        :disabled="!canRecharge"
        @click="confirmRecharge"
      >
        立即充值 ¥{{ rechargeAmount }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface RechargeAmount {
  amount: number
  gift?: number
}

interface PaymentMethod {
  id: string
  name: string
  desc: string
  icon: string
}

const currentBalance = ref('86.50')
const selectedAmount = ref(50)
const customAmount = ref('')

const rechargeAmounts: RechargeAmount[] = [
  { amount: 30 },
  { amount: 50, gift: 2 },
  { amount: 100, gift: 10 },
  { amount: 200, gift: 25 },
  { amount: 500, gift: 80 }
]

const paymentMethods: PaymentMethod[] = [
  {
    id: 'wechat',
    name: '微信支付',
    desc: '推荐使用',
    icon: 'https://res.wx.qq.com/wxdoc/dist/assets/img/mp1535792205296.mp.jpg'
  },
  {
    id: 'alipay',
    name: '支付宝',
    desc: '',
    icon: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 'unionpay',
    name: '银联支付',
    desc: '',
    icon: 'https://www.unionpayintl.com/resource/images/global/logo.png'
  }
]

const selectedPayment = ref('wechat')

const rechargeAmount = computed(() => {
  return customAmount.value ? parseFloat(customAmount.value) : selectedAmount.value
})

const canRecharge = computed(() => {
  const amount = rechargeAmount.value
  return amount > 0 && amount <= 5000
})

// 选择充值金额
const selectAmount = (amount: number) => {
  selectedAmount.value = amount
  customAmount.value = ''
}

// 处理自定义金额输入
const handleCustomAmount = (e: any) => {
  const value = e.detail.value
  // 清除非数字字符，保留小数点后两位
  const cleanValue = value.replace(/[^\d.]/g, '').replace(/^(\d+\.\d{2}).*$/, '$1')
  customAmount.value = cleanValue
  selectedAmount.value = 0
}

// 选择支付方式
const selectPayment = (id: string) => {
  selectedPayment.value = id
}

// 确认充值
const confirmRecharge = () => {
  if (!canRecharge.value) {
    // @ts-ignore
    uni.showToast({
      title: '请输入有效的充值金额',
      icon: 'none'
    })
    return
  }
  
  // @ts-ignore
  uni.showModal({
    title: '确认充值',
    content: `确定要充值¥${rechargeAmount.value}吗？`,
    success: function (res) {
      if (res.confirm) {
        // 这里可以调用支付接口
        // @ts-ignore
        uni.showToast({
          title: '充值成功',
          icon: 'success'
        })
        
        // 更新余额
        const newBalance = parseFloat(currentBalance.value) + rechargeAmount.value
        currentBalance.value = newBalance.toFixed(2)
        
        // 重置选择
        selectedAmount.value = 50
        customAmount.value = ''
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf2 100%);
  min-height: 100vh;
  padding-bottom: 60rpx;
}

/* 余额显示区域 */
.balance-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
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
    background: linear-gradient(90deg, $primary-color, #3399ff, #66b3ff);
  }
  
  .balance-label {
    font-size: 28rpx;
    color: $text-color-secondary;
    margin-bottom: 24rpx;
    font-weight: 600;
  }
  
  .balance-amount {
    font-size: 64rpx;
    font-weight: 800;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

/* 充值金额选择区域 */
.recharge-amount-section,
.payment-method-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 40rpx 36rpx;
  margin: 0 30rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.6s ease-out 0.1s both;
  
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
  
  /* 金额选择网格 */
  .amount-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    
    .amount-card {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 28rpx 16rpx;
      border: 2rpx solid $border-color-light;
      transition: all 0.3s ease;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10rpx;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4rpx;
        background: linear-gradient(90deg, $primary-color, #3399ff);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:active {
        transform: translateY(2rpx) scale(0.98);
        box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.1);
      }
      
      &.active {
        border-color: $primary-color;
        box-shadow: 0 6rpx 20rpx rgba(0, 132, 255, 0.2);
        
        &::before {
          opacity: 1;
        }
      }
      
      .amount-value {
        font-size: 34rpx;
        font-weight: 700;
        color: $text-color;
      }
      
      .amount-gift {
        display: flex;
        align-items: center;
        gap: 6rpx;
        
        .gift-icon {
          font-size: 20rpx;
        }
        
        .gift-text {
          font-size: 20rpx;
          color: $error-color;
          font-weight: 600;
        }
      }
      
      /* 自定义金额卡片 */
      &.custom-card {
        grid-column: 1 / -1;
        padding: 32rpx 20rpx;
        
        .custom-input {
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 36rpx;
          color: $primary-color;
          font-weight: 700;
          background: transparent;
          border: none;
          outline: none;
        }
        
        .custom-input::placeholder {
          color: $text-color-tertiary;
          font-weight: 600;
          font-size: 30rpx;
        }
      }
    }
  }
  
  /* 支付方式列表 */
  .payment-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    
    .payment-item {
      display: flex;
      align-items: center;
      padding: 36rpx;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
      border-radius: 20rpx;
      border: 2rpx solid $border-color-light;
      transition: all 0.3s ease;
      box-shadow: 0 6rpx 24rpx rgba(0, 0, 0, 0.08);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 6rpx;
        background: linear-gradient(180deg, $primary-color, #3399ff);
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:active {
        transform: translateY(4rpx) scale(0.985);
        box-shadow: 0 10rpx 36rpx rgba(0, 0, 0, 0.15);
      }
      
      &.active {
        border-color: $primary-color;
        box-shadow: 0 12rpx 40rpx rgba(0, 132, 255, 0.25);
        
        &::before {
          opacity: 1;
        }
      }
      
      .item-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 24rpx;
        background: #ffffff;
        border-radius: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1rpx solid $border-color-light;
        
        .icon-img {
          width: 60rpx;
          height: 60rpx;
        }
      }
      
      .item-info {
        flex: 1;
        
        .info-name {
          font-size: 36rpx;
          color: $text-color;
          font-weight: 800;
          margin-bottom: 12rpx;
          background: linear-gradient(135deg, $text-color, $text-color-secondary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .info-desc {
          font-size: 26rpx;
          color: $text-color-tertiary;
          font-weight: 600;
          background: linear-gradient(135deg, $primary-color, $primary-color-light);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      
      .item-check {
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .icon-check {
          font-size: 44rpx;
          color: $border-color;
          transition: all 0.3s ease;
        }
      }
      
      &.active {
        .item-check {
          .icon-check {
            color: $primary-color;
          }
        }
      }
    }
  }
}

/* 充值按钮区域 */
.recharge-action {
  padding: 0 30rpx;
  margin-top: 20rpx;
  animation: fadeInUp 0.6s ease-out 0.3s both;
  
  .recharge-btn {
    width: 100%;
    height: 96rpx;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    color: $white;
    font-size: 32rpx;
    font-weight: 700;
    border-radius: 48rpx;
    border: none;
    box-shadow: 0 12rpx 32rpx rgba(0, 132, 255, 0.35);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    
    &:active {
      transform: scale(0.98) translateY(2rpx);
      box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.25);
    }
    
    &:disabled {
      background: linear-gradient(135deg, $gray-3, $gray-4);
      color: $gray-6;
      box-shadow: none;
      transform: none;
    }
  }
}

/* 入场动画 */
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
</style>