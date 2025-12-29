<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="个人中心" :show-back="false" />
    
    <!-- 用户信息区域 -->
    <view class="user-info-section">
      <view class="user-avatar">
        <image class="avatar-img" src="/static/logo.png" mode="aspectFill"></image>
      </view>
      <view class="user-details">
        <view class="user-name">张三</view>
        <view class="user-phone">138****8888</view>
        <view class="user-level">
          <text class="level-tag">普通用户</text>
        </view>
      </view>
      <view class="arrow-right">
        <text class="iconfont icon-arrow-right"></text>
      </view>
    </view>
    
    <!-- 钱包信息 -->
    <view class="wallet-section">
      <view class="wallet-item">
        <view class="item-label">账户余额</view>
        <view class="item-value">¥86.50</view>
        <button class="recharge-btn" @click="goToRecharge">充值</button>
      </view>
      <view class="wallet-item">
        <view class="item-label">优惠券</view>
        <view class="item-value">3张可用</view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-item" @click="goToOrderList">
        <view class="item-left">
          <text class="iconfont icon-order-list"></text>
          <text class="item-text">我的订单</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-item" @click="goToChargeRecord">
        <view class="item-left">
          <text class="iconfont icon-record"></text>
          <text class="item-text">充电记录</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-item" @click="goToWallet">
        <view class="item-left">
          <text class="iconfont icon-wallet"></text>
          <text class="item-text">我的钱包</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-item" @click="goToCoupon">
        <view class="item-left">
          <text class="iconfont icon-coupon"></text>
          <text class="item-text">优惠券</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-item" @click="goToAddress">
        <view class="item-left">
          <text class="iconfont icon-address"></text>
          <text class="item-text">地址管理</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
      
      <view class="menu-item" @click="goToSettings">
        <view class="item-left">
          <text class="iconfont icon-settings"></text>
          <text class="item-text">设置</text>
        </view>
        <view class="arrow-right">
          <text class="iconfont icon-arrow-right"></text>
        </view>
      </view>
    </view>
    
    <!-- 底部按钮 -->
    <view class="footer-section">
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import CustomNavbar from '@/components/CustomNavbar.vue'

// 跳转到充值页面
const goToRecharge = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/user/recharge'
  })
}

// 跳转到订单列表
const goToOrderList = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/order/list'
  })
}

// 跳转到充电记录
const goToChargeRecord = () => {
  // @ts-ignore
  uni.showToast({
    title: '充电记录功能开发中',
    icon: 'none'
  })
}

// 跳转到钱包
const goToWallet = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/user/wallet'
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

// 跳转到地址管理
const goToAddress = () => {
  // @ts-ignore
  uni.showToast({
    title: '地址管理功能开发中',
    icon: 'none'
  })
}

// 跳转到设置
const goToSettings = () => {
  // @ts-ignore
  uni.showToast({
    title: '设置功能开发中',
    icon: 'none'
  })
}

// 退出登录
const handleLogout = () => {
  // @ts-ignore
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: function (res) {
      if (res.confirm) {
        // @ts-ignore
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}

/* 用户信息区域优化 */
.user-info-section {
  display: flex;
  align-items: center;
  padding: 60rpx 30rpx;
  background: linear-gradient(135deg, $primary-color, #3399ff);
  margin-bottom: 20rpx;
  border-radius: 0 0 24rpx 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 132, 255, 0.35);
  
  .user-avatar {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 32rpx;
    border: 6rpx solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
    
    .avatar-img {
      width: 100%;
      height: 100%;
      background-color: $white;
    }
  }
  
  .user-details {
    flex: 1;
    
    .user-name {
      font-size: 36rpx;
      font-weight: 600;
      color: $white;
      margin-bottom: 12rpx;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }
    
    .user-phone {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 16rpx;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }
    
    .user-level {
      .level-tag {
        font-size: 24rpx;
        color: $primary-color;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 8rpx 20rpx;
        border-radius: 18rpx;
        font-weight: 500;
      }
    }
  }
  
  .arrow-right {
    width: 70rpx;
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:active {
      background-color: rgba(255, 255, 255, 0.25);
      transform: scale(0.95);
    }
  }
}

/* 钱包信息优化 */
.wallet-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 20rpx;
  padding: 0 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .wallet-item {
    display: flex;
    align-items: center;
    padding: 32rpx 0;
    transition: all 0.3s ease;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 500;
      flex: 1;
    }
    
    .item-value {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
      margin-right: 20rpx;
    }
    
    .recharge-btn {
      min-width: 120rpx;
      height: 60rpx;
      background: linear-gradient(135deg, $primary-color, #3399ff);
      color: $white;
      font-size: 26rpx;
      font-weight: 500;
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
      transition: all 0.3s ease;
      
      &:active {
        transform: scale(0.95);
        box-shadow: 0 3rpx 9rpx rgba(0, 132, 255, 0.25);
      }
    }
    
    .arrow-right {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-color-tertiary;
      transition: all 0.3s ease;
      
      &:active {
        color: $primary-color;
      }
    }
  }
}

/* 功能菜单优化 */
.menu-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  overflow: hidden;
  
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 36rpx 32rpx;
    transition: all 0.3s ease;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    &:active {
      background-color: rgba(0, 132, 255, 0.06);
    }
    
    .item-left {
      display: flex;
      align-items: center;
      
      .iconfont {
        font-size: 40rpx;
        color: $primary-color;
        margin-right: 24rpx;
        text-shadow: 0 2rpx 4rpx rgba(0, 132, 255, 0.2);
      }
      
      .item-text {
        font-size: 30rpx;
        color: $text-color;
        font-weight: 500;
      }
    }
    
    .arrow-right {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $text-color-tertiary;
      font-size: 28rpx;
    }
  }
}

/* 底部按钮优化 */
.footer-section {
  padding: 0 30rpx;
  
  .logout-btn {
    width: 100%;
    height: 90rpx;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    color: $error-color;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 45rpx;
    border: 1rpx solid rgba(237, 63, 20, 0.3);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
      background-color: rgba(237, 63, 20, 0.06);
    }
  }
}
</style>