<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="充电完成" :show-back="false" />
    
    <!-- 充电结果 -->
    <view class="charge-result-section">
      <view class="result-icon">
        <text class="iconfont icon-success"></text>
      </view>
      <view class="result-text">充电已完成</view>
      <view class="result-desc">感谢您使用电动车充电服务</view>
    </view>
    
    <!-- 充电详情 -->
    <view class="charge-detail-section">
      <view class="detail-item">
        <view class="item-label">电站名称</view>
        <view class="item-value">XX小区充电站</view>
      </view>
      <view class="detail-item">
        <view class="item-label">充电桩</view>
        <view class="item-value">充电桩01</view>
      </view>
      <view class="detail-item">
        <view class="item-label">开始时间</view>
        <view class="item-value">2023-10-12 14:30</view>
      </view>
      <view class="detail-item">
        <view class="item-label">结束时间</view>
        <view class="item-value">2023-10-12 15:55</view>
      </view>
      <view class="detail-item">
        <view class="item-label">充电时长</view>
        <view class="item-value">01:25:30</view>
      </view>
      <view class="detail-item">
        <view class="item-label">充电电量</view>
        <view class="item-value">12.5度</view>
      </view>
      <view class="detail-item">
        <view class="item-label">充电费用</view>
        <view class="item-value price">¥8.60</view>
      </view>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-section">
      <button class="action-btn primary-btn" @click="viewOrderDetail">查看订单详情</button>
      <button class="action-btn secondary-btn" @click="goHome">返回首页</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import CustomNavbar from '@/components/CustomNavbar.vue'

// 查看订单详情
const viewOrderDetail = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/order/detail?id=1'
  })
}

// 返回首页
const goHome = () => {
  // @ts-ignore
  uni.switchTab({
    url: '/pages/index/index'
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

/* 充电结果优化 */
.charge-result-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 30rpx;
  background: linear-gradient(135deg, #ffffff 0%, #e8f5e8 100%);
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border-radius: 0 0 24rpx 24rpx;
  
  .result-icon {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(25, 190, 107, 0.15), rgba(0, 132, 255, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 36rpx;
    box-shadow: 0 12rpx 36rpx rgba(25, 190, 107, 0.3);
    animation: bounceIn 0.8s ease-out;
    
    .icon-success {
      font-size: 80rpx;
      color: $success-color;
      text-shadow: 0 4rpx 12rpx rgba(25, 190, 107, 0.4);
    }
  }
  
  .result-text {
    font-size: 42rpx;
    font-weight: 700;
    color: $text-color;
    margin-bottom: 20rpx;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  }
  
  .result-desc {
    font-size: 28rpx;
    color: $text-color-secondary;
    line-height: 1.5;
    text-align: center;
    max-width: 500rpx;
  }
}

/* 充电详情优化 */
.charge-detail-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 36rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28rpx 0;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 500;
      flex-shrink: 0;
      width: 140rpx;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      font-weight: 500;
      text-align: right;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      
      &.price {
        color: $error-color;
        font-weight: 700;
        font-size: 36rpx;
        text-shadow: 0 2rpx 4rpx rgba(237, 63, 20, 0.2);
      }
    }
  }
}

/* 操作按钮优化 */
.action-section {
  padding: 0 30rpx;
  
  .action-btn {
    width: 100%;
    height: 90rpx;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 45rpx;
    margin-bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
    }
    
    &.primary-btn {
      background: linear-gradient(135deg, $primary-color, #3399ff);
      color: $white;
      box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.35);
    }
    
    &.secondary-btn {
      background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
      color: $text-color;
      border: 1rpx solid $border-color-light;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 动画效果 */
@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: scale(0.9);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>