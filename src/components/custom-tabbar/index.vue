<template>
  <view class="custom-tabbar">
    <view class="tabbar-item" v-for="(item, index) in tabbarList" :key="index" @click="switchTab(index)">
      <view class="tabbar-icon-container" :class="{ 'center-item': index === 2 }">
        <image 
          class="tabbar-icon" 
          :src="selectedTabIndex === index ? item.selectedIconPath : item.iconPath" 
          mode="aspectFit"
        ></image>
      </view>
      <text 
        class="tabbar-text" 
        :style="{ color: selectedTabIndex === index ? selectedColor : color }"
        :class="{ 'center-text': index === 2 }"
      >
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Tabbar配置
const tabbarList = ref([
  {
    pagePath: '/pages/index/index',
    iconPath: '/static/tabbar/home.png',
    selectedIconPath: '/static/tabbar/home-active.png',
    text: '首页'
  },
  {
    pagePath: '/pages/station/list',
    iconPath: '/static/tabbar/station.png',
    selectedIconPath: '/static/tabbar/station-active.png',
    text: '电站'
  },
  {
    pagePath: '/pages/index/index',
    iconPath: '/static/tabbar/scan.png',
    selectedIconPath: '/static/tabbar/scan.png',
    text: '扫码'
  },
  {
    pagePath: '/pages/order/list',
    iconPath: '/static/tabbar/order.png',
    selectedIconPath: '/static/tabbar/order-active.png',
    text: '订单'
  },
  {
    pagePath: '/pages/user/index',
    iconPath: '/static/tabbar/user.png',
    selectedIconPath: '/static/tabbar/user-active.png',
    text: '我的'
  }
])

// 样式配置
const color = ref('#7A7E83')
const selectedColor = ref('#0084ff')
const selectedTabIndex = ref(0)

// 切换tab
const switchTab = (index: number) => {
  selectedTabIndex.value = index
  
  // 中间扫码按钮特殊处理
  if (index === 2) {
    // @ts-ignore
    uni.showToast({
      title: '扫码充电功能开发中',
      icon: 'none'
    })
    return
  }
  
  // @ts-ignore
  uni.switchTab({
    url: tabbarList.value[index].pagePath
  })
}

// 获取当前页面路径
const getCurrentPagePath = () => {
  // @ts-ignore
  const pages = getCurrentPages()
  if (pages.length > 0) {
    // @ts-ignore
    const currentPage = pages[pages.length - 1]
    return `/${currentPage.route}`
  }
  return '/pages/index/index'
}

// 页面加载时设置选中状态
onMounted(() => {
  const currentPagePath = getCurrentPagePath()
  const index = tabbarList.value.findIndex(item => item.pagePath === currentPagePath)
  if (index !== -1) {
    selectedTabIndex.value = index
  }
})
</script>

<style lang="scss" scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  background-color: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;
  position: relative;
  padding-bottom: 10rpx;
  box-sizing: border-box;
}

.tabbar-icon-container {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.tabbar-icon-container.center-item {
  width: 90rpx;
  height: 90rpx;
  background: linear-gradient(135deg, #0084ff, #3399ff);
  border-radius: 50%;
  margin-bottom: 0;
  position: absolute;
  top: -40rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.3);
  border: 6rpx solid #ffffff;
}

.tabbar-icon {
  width: 100%;
  height: 100%;
}

.tabbar-icon-container.center-item .tabbar-icon {
  width: 50rpx;
  height: 50rpx;
}

.tabbar-text {
  font-size: 20rpx;
  line-height: 1;
}

.tabbar-text.center-text {
  position: absolute;
  bottom: 10rpx;
  color: #ffffff !important;
}
</style>