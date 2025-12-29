<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="我的钱包" />
    
    <!-- 钱包余额 -->
    <view class="wallet-balance-section">
      <view class="balance-label">账户余额</view>
      <view class="balance-amount">¥{{ walletInfo.balance }}</view>
      <view class="balance-actions">
        <button class="action-btn" @click="goToRecharge">充值</button>
        <button class="action-btn secondary" @click="goToWithdraw">提现</button>
      </view>
    </view>
    
    <!-- 钱包功能 -->
    <view class="wallet-functions">
      <view class="function-item" @click="goToRechargeRecord">
        <view class="item-icon bg-blue">
          <text class="iconfont icon-recharge"></text>
        </view>
        <view class="item-text">充值记录</view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      <view class="function-item" @click="goToConsumeRecord">
        <view class="item-icon bg-green">
          <text class="iconfont icon-consume"></text>
        </view>
        <view class="item-text">消费记录</view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      <view class="function-item" @click="goToCoupon">
        <view class="item-icon bg-orange">
          <text class="iconfont icon-coupon"></text>
        </view>
        <view class="item-text">优惠券</view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
    
    <!-- 优惠活动 -->
    <view class="promotion-section">
      <view class="section-title">优惠活动</view>
      <view class="promotion-list">
        <view class="promotion-item">
          <view class="item-left">
            <text class="discount-tag">充值优惠</text>
            <text class="discount-desc">充值满100元送10元</text>
          </view>
          <view class="item-right">
            <button class="get-btn">立即充值</button>
          </view>
        </view>
        <view class="promotion-item">
          <view class="item-left">
            <text class="discount-tag">首充特惠</text>
            <text class="discount-desc">首次充值享9折优惠</text>
          </view>
          <view class="item-right">
            <button class="get-btn">立即充值</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface WalletInfo {
  balance: string
}

const walletInfo = ref<WalletInfo>({
  balance: '86.50'
})

// 跳转到充值页面
const goToRecharge = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/user/recharge'
  })
}

// 跳转到提现页面
const goToWithdraw = () => {
  // @ts-ignore
  uni.showToast({
    title: '提现功能开发中',
    icon: 'none'
  })
}

// 跳转到充值记录
const goToRechargeRecord = () => {
  // @ts-ignore
  uni.showToast({
    title: '充值记录功能开发中',
    icon: 'none'
  })
}

// 跳转到消费记录
const goToConsumeRecord = () => {
  // @ts-ignore
  uni.showToast({
    title: '消费记录功能开发中',
    icon: 'none'
  })
}

// 跳转到优惠券
const goToCoupon = () => {
  // @ts-ignore
  uni.showToast({
    title: '优惠券功能开发中',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf2 100%);
  min-height: 100vh;
  padding-bottom: 60rpx;
}

/* 钱包余额区域 */
.wallet-balance-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx;
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
    background: linear-gradient(90deg, $primary-color, #3399ff, #66b3ff);
  }
  
  .balance-label {
    font-size: 28rpx;
    color: $text-color-secondary;
    margin-bottom: 24rpx;
    font-weight: 600;
  }
  
  .balance-amount {
    font-size: 72rpx;
    font-weight: 800;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 52rpx;
  }
  
  .balance-actions {
    display: flex;
    gap: 24rpx;
    
    .action-btn {
      width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      font-weight: 700;
      border-radius: 40rpx;
      border: none;
      transition: all 0.3s ease;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10rpx;
      
      &:first-child {
        background: linear-gradient(135deg, $primary-color, #3399ff);
        color: $white;
      }
      
      &:first-child:active {
        transform: translateY(2rpx);
        box-shadow: 0 6rpx 16rpx rgba(0, 132, 255, 0.3);
      }
      
      &.secondary {
        background: linear-gradient(135deg, #ffffff 0%, #f0f2f5 100%);
        color: $text-color;
        border: 2rpx solid $border-color-light;
      }
      
      &.secondary:active {
        transform: translateY(2rpx);
        box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
      }
    }
  }
}

/* 钱包功能区域 */
.wallet-functions {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  animation: fadeInUp 0.6s ease-out 0.1s both;
  
  .function-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40rpx 20rpx;
    transition: all 0.3s ease;
    position: relative;
    
    &:active {
      transform: translateY(4rpx) scale(0.98);
    }
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      width: 2rpx;
      height: 60%;
      background: linear-gradient(180deg, transparent, $border-color-light, transparent);
    }
    
    &:nth-child(3n)::after {
      display: none;
    }
    
    .item-icon {
      width: 96rpx;
      height: 96rpx;
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20rpx;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      
      .iconfont {
        font-size: 48rpx;
        color: $white;
      }
      
      &.bg-blue {
        background: linear-gradient(135deg, $primary-color, #3399ff);
      }
      
      &.bg-green {
        background: linear-gradient(135deg, $success-color, #20c997);
      }
      
      &.bg-orange {
        background: linear-gradient(135deg, $warning-color, #ffc107);
      }
      
      .function-item:active & {
        transform: scale(0.95);
      }
    }
    
    .item-text {
      font-size: 28rpx;
      font-weight: 700;
      color: $text-color;
      text-align: center;
    }
    
    .arrow-right {
      display: none;
    }
  }
}

/* 优惠活动区域 */
.promotion-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  padding: 40rpx 36rpx;
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
  
  .promotion-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    
    .promotion-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 36rpx;
      background: linear-gradient(135deg, rgba(0, 132, 255, 0.08), rgba(0, 132, 255, 0.04));
      border-radius: 18rpx;
      border: 1rpx solid rgba(0, 132, 255, 0.2);
      transition: all 0.3s ease;
      box-shadow: 0 4rpx 16rpx rgba(0, 132, 255, 0.08);
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.15);
      }
      
      &:not(:last-child) {
        border-bottom: none;
      }
      
      .item-left {
        .discount-tag {
          display: inline-block;
          font-size: 24rpx;
          font-weight: 700;
          color: $error-color;
          background: linear-gradient(135deg, rgba(237, 63, 20, 0.15), rgba(237, 63, 20, 0.08));
          padding: 8rpx 20rpx;
          border-radius: 18rpx;
          margin-bottom: 12rpx;
        }
        
        .discount-desc {
          font-size: 30rpx;
          font-weight: 700;
          color: $text-color;
          line-height: 1.4;
        }
      }
      
      .item-right {
        .get-btn {
          width: 160rpx;
          height: 64rpx;
          background: linear-gradient(135deg, $primary-color, #3399ff);
          color: $white;
          font-size: 26rpx;
          font-weight: 700;
          border-radius: 32rpx;
          border: none;
          transition: all 0.3s ease;
          box-shadow: 0 6rpx 20rpx rgba(0, 132, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          
          &:active {
            transform: scale(0.96);
            box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.15);
          }
        }
      }
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