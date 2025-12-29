<template>
  <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="navbar-content">
      <view class="navbar-left" v-if="showBack" @click="handleBack">
        <text class="iconfont icon-back"></text>
      </view>
      <view class="navbar-center">
        <text class="navbar-title">{{ title }}</text>
      </view>
      <view class="navbar-right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  title?: string
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showBack: true
})

const statusBarHeight = ref(0)

onMounted(() => {
  // 获取状态栏高度
  // @ts-ignore
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})

const handleBack = () => {
  // @ts-ignore
  if (getCurrentPages().length > 1) {
    // @ts-ignore
    uni.navigateBack()
  } else {
    // @ts-ignore
    uni.switchTab({
      url: '/pages/index/index'
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-navbar {
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 999;
  border-bottom: 1rpx solid $border-color-light;
}

.navbar-content {
  height: 88rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
}

.navbar-left {
  width: 80rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10rpx;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.7;
  }
}

.navbar-left .icon-back {
  font-size: 36rpx;
  color: $text-color;
}

.navbar-center {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.navbar-title {
  font-size: 34rpx;
  font-weight: 600;
  color: $text-color;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.navbar-right {
  width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10rpx;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.7;
  }
}
</style>