<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="电动车充电" :show-back="false">
      <template #right>
        <view class="navbar-right">
          <text class="iconfont icon-scan"></text>
        </view>
      </template>
    </CustomNavbar>
    
    <!-- 顶部搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input 
          class="search-input" 
          placeholder="搜索附近充电桩" 
          confirm-type="search"
          @confirm="handleSearch"
        />
      </view>
    </view>
    
    <!-- 轮播图区域 -->
    <view class="swiper-section">
      <swiper 
        class="banner-swiper" 
        indicator-dots 
        autoplay 
        interval="5000" 
        duration="1000"
        circular
      >
        <swiper-item v-for="(item, index) in bannerList" :key="index" class="swiper-item">
          <image class="banner-image" :src="item.image" mode="aspectFill"></image>
          <view class="banner-text">
            <text class="banner-title">{{ item.title }}</text>
            <text class="banner-desc">{{ item.desc }}</text>
          </view>
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 充电状态卡片 -->
    <view class="charge-status-card" v-if="hasCharging">
      <view class="card-header">
        <text class="header-title">正在充电</text>
        <text class="header-status">充电中</text>
      </view>
      <view class="card-content">
        <view class="content-left">
          <view class="station-name">XX小区充电站</view>
          <view class="charge-info">
            <text class="info-item">已充电 {{ chargeInfo.power }} 度</text>
            <text class="info-item">已用时 {{ chargeInfo.time }}</text>
            <text class="info-item">预计费用 ¥{{ chargeInfo.fee }}</text>
          </view>
        </view>
        <view class="content-right">
          <button class="stop-btn" @click="stopCharging">结束充电</button>
        </view>
      </view>
      <view class="progress-section">
        <view class="progress-bar">
          <view class="progress-fill" :style="{ width: progress + '%' }"></view>
        </view>
        <view class="progress-text">{{ progress }}%</view>
      </view>
    </view>
    
    <!-- 优惠活动 -->
    <view class="promotion-section">
      <view class="section-title">
        <text class="title-text">优惠活动</text>
        <text class="more-text" @click="goToPromotion">更多 ></text>
      </view>
      <view class="promotion-list">
        <view class="promotion-item">
          <view class="item-left">
            <text class="discount-tag">首充优惠</text>
            <text class="discount-desc">首次充电立减2元</text>
          </view>
          <view class="item-right">
            <button class="get-btn">立即领取</button>
          </view>
        </view>
        <view class="promotion-item">
          <view class="item-left">
            <text class="discount-tag">会员专享</text>
            <text class="discount-desc">月卡会员享8折优惠</text>
          </view>
          <view class="item-right">
            <button class="get-btn">立即开通</button>
          </view>
        </view>
        <view class="promotion-item">
          <view class="item-left">
            <text class="discount-tag">限时特惠</text>
            <text class="discount-desc">充值满100送20</text>
          </view>
          <view class="item-right">
            <button class="get-btn">立即参与</button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 推荐电站 -->
    <view class="recommend-section">
      <view class="section-title">
        <text class="title-text">推荐电站</text>
        <text class="more-text" @click="goToStationList">更多 ></text>
      </view>
      <view class="station-list">
        <view class="station-item" v-for="station in recommendStations" :key="station.id" @click="goToStationDetail(station.id)">
          <image class="station-image" :src="station.image" mode="aspectFill"></image>
          <view class="station-info">
            <view class="station-name">{{ station.name }}</view>
            <view class="station-address">
              <text class="iconfont icon-location"></text>
              <text class="address-text">{{ station.address }}</text>
            </view>
            <view class="station-tags">
              <text class="tag-item tag-fast" v-if="station.isFast">快充</text>
              <text class="tag-item tag-free" v-if="station.isFree">空闲</text>
              <text class="tag-item tag-discount" v-if="station.hasDiscount">优惠</text>
            </view>
            <view class="station-price">
              <text class="price-text">￥{{ station.price }}/度</text>
              <text class="distance-text">{{ station.distance }}km</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'
import CustomTabbar from '@/components/custom-tabbar/index.vue'

// 轮播图数据
const bannerList = ref([
  {
    image: '/static/car01.jpg',
    title: '电动车充电新体验',
    desc: '全国超过10000个充电站，随时随地便捷充电'
  },
  {
    image: '/static/car01.jpg',
    title: '会员专享优惠',
    desc: '开通会员立享充电8折优惠，还有更多特权等你来'
  },
  {
    image: '/static/car01.jpg',
    title: '绿色出行，从充电开始',
    desc: '使用清洁能源，为环保贡献一份力量'
  }
])

// 推荐电站数据
const recommendStations = ref([
  {
    id: '1',
    image: 'https://aimg8.dlssyht.cn/u/1810712/ueditor/image/906/1810712/1672372872136105.jpg',
    name: 'XX小区充电站',
    address: '朝阳区XX路XX号',
    price: '1.2',
    distance: '0.5',
    isFast: true,
    isFree: true,
    hasDiscount: true
  },
  {
    id: '2',
    image: 'https://ts1.tc.mm.bing.net/th/id/R-C.2e01c67dcc34f310e37d3b3919185d81?rik=wv3bTuzRYmJ0ig&riu=http%3a%2f%2fimage.dingdingzn.com%2f1+-+%e5%89%af%e6%9c%ac1606180515530&ehk=rdaqFJ6e4FiJaYyZGdQ9IAXu84kE2tqrK%2bzGZfhKr%2b8%3d&risl=&pid=ImgRaw&r=0',
    name: 'YY商场充电站',
    address: '朝阳区YY路YY号',
    price: '1.5',
    distance: '1.2',
    isFast: true,
    isFree: false,
    hasDiscount: false
  },
  {
    id: '3',
    image: 'https://pic.vjshi.com/2017-09-12/c4fffbb804596cc049dbe34995777db6/00001.jpg?x-oss-process=style/watermark',
    name: 'ZZ大厦充电站',
    address: '朝阳区ZZ路ZZ号',
    price: '0.8',
    distance: '2.1',
    isFast: false,
    isFree: true,
    hasDiscount: true
  }
])

// 充电状态
const hasCharging = ref(true)
const chargeInfo = ref({
  power: '12.5',
  time: '01:25:30',
  fee: '8.60'
})

// 充电进度
const progress = ref(65)

// 跳转到电站列表
const goToStationList = () => {
  // @ts-ignore
  uni.switchTab({
    url: '/pages/station/list'
  })
}

// 跳转到电站详情
const goToStationDetail = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/station/detail?id=${id}`
  })
}

// 跳转到扫码充电
const goToScanCode = () => {
  // @ts-ignore
  uni.showToast({
    title: '扫码充电功能开发中',
    icon: 'none'
  })
}

// 跳转到订单列表
const goToOrderList = () => {
  // @ts-ignore
  uni.switchTab({
    url: '/pages/order/list'
  })
}

// 跳转到个人中心
const goToUserCenter = () => {
  // @ts-ignore
  uni.switchTab({
    url: '/pages/user/index'
  })
}

// 处理搜索
const handleSearch = (e: any) => {
  const keyword = e.detail.value
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/station/list?keyword=${keyword}`
  })
}

// 跳转到优惠活动页面
const goToPromotion = () => {
  // @ts-ignore
  uni.showToast({
    title: '优惠活动页面开发中',
    icon: 'none'
  })
}

// 结束充电
const stopCharging = () => {
  // @ts-ignore
  uni.showModal({
    title: '确认结束',
    content: '确定要结束本次充电吗？',
    success: function (res) {
      if (res.confirm) {
        hasCharging.value = false
        // @ts-ignore
        uni.showToast({
          title: '已结束充电',
          icon: 'success'
        })
      }
    }
  })
}

// 模拟充电进度更新
onMounted(() => {
  const timer = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1
    } else {
      clearInterval(timer)
    }
  }, 3000)
})
</script>

<style lang="scss" scoped>
/* 全局样式优化 */
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 140rpx; /* 为tabbar留出更多空间 */
  box-sizing: border-box;
}

/* 导航栏右侧按钮样式 */
.navbar-right {
  width: 80rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: $text-color;
  transition: opacity 0.2s;
  
  &:active {
    opacity: 0.7;
  }
}

/* 搜索区域优化 */
.search-section {
  padding: 20rpx 30rpx;
  background-color: $white;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 99;
}

.search-box {
  display: flex;
  align-items: center;
  height: 76rpx;
  background-color: rgba(0, 132, 255, 0.08);
  border: 1rpx solid rgba(0, 132, 255, 0.2);
  border-radius: 38rpx;
  padding: 0 30rpx;
  transition: all 0.3s ease;
  
  &:active {
    background-color: rgba(0, 132, 255, 0.12);
  }
  
  .icon-search {
    font-size: 32rpx;
    color: $primary-color;
    margin-right: 20rpx;
  }
  
  .search-input {
    flex: 1;
    font-size: 28rpx;
    color: $text-color;
    background: transparent;
    height: 100%;
  }
}

/* 轮播图区域优化 */
.swiper-section {
  height: 340rpx;
  position: relative;
  margin: 20rpx 30rpx;
  background-color: #f5f7fa;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.banner-swiper {
  height: 100%;
  
  .swiper-item {
    position: relative;
    
    .banner-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-color: #e8ecf2;
    }
    
    .banner-text {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      color: $white;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
      padding: 60rpx 30rpx 30rpx;
      box-sizing: border-box;
      
      .banner-title {
        font-size: 36rpx;
        font-weight: 700;
        display: block;
        margin-bottom: 12rpx;
        line-height: 1.3;
        word-wrap: break-word;
      }
      
      .banner-desc {
        font-size: 26rpx;
        display: block;
        line-height: 1.4;
        word-wrap: break-word;
        opacity: 0.9;
      }
    }
  }
}

/* 通用区域标题优化 */
.section-title {
  font-size: 34rpx;
  font-weight: 600;
  color: $text-color;
  padding: 30rpx 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .title-text {
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
      background: linear-gradient(180deg, #0084ff, #3399ff);
      border-radius: 2rpx;
    }
  }
  
  .more-text {
    font-size: 26rpx;
    color: $text-color-secondary;
    font-weight: 400;
    transition: color 0.2s;
    
    &:active {
      color: $primary-color;
    }
  }
}

/* 充电状态卡片优化 */
.charge-status-card {
  margin: 0 30rpx 20rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  transition: all 0.3s ease;
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    
    .header-title {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
    }
    
    .header-status {
      font-size: 26rpx;
      color: $success-color;
      background-color: rgba(25, 190, 107, 0.12);
      padding: 8rpx 20rpx;
      border-radius: 18rpx;
      font-weight: 500;
    }
  }
  
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28rpx;
    
    .content-left {
      flex: 1;
      
      .station-name {
        font-size: 28rpx;
        font-weight: 600;
        color: $text-color;
        margin-bottom: 20rpx;
      }
      
      .charge-info {
        display: flex;
        flex-direction: column;
        
        .info-item {
          font-size: 24rpx;
          color: $text-color-secondary;
          margin-bottom: 12rpx;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    
    .content-right {
      .stop-btn {
        width: 168rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #ed3f14, #ff6666);
        color: $white;
        font-size: 28rpx;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0 20rpx;
        box-sizing: border-box;
        box-shadow: 0 6rpx 18rpx rgba(237, 63, 20, 0.35);
        transition: all 0.3s ease;
        
        &:active {
          transform: translateY(2rpx);
          box-shadow: 0 3rpx 9rpx rgba(237, 63, 20, 0.25);
        }
      }
    }
  }
  
  .progress-section {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    
    .progress-bar {
      flex: 1;
      height: 14rpx;
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 7rpx;
      overflow: hidden;
      margin-right: 20rpx;
      box-shadow: inset 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, $primary-color, #3399ff);
        border-radius: 7rpx;
        transition: width 0.5s ease;
        box-shadow: 0 0 12rpx rgba(0, 132, 255, 0.4);
      }
    }
    
    .progress-text {
      font-size: 28rpx;
      color: $primary-color;
      font-weight: 600;
    }
  }
}

/* 优惠活动区域优化 */
.promotion-section {
  margin: 0 30rpx 20rpx;
  background-color: $white;
  border-radius: 16rpx;
  padding: 0 30rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.promotion-section .section-title {
  padding: 30rpx 0 20rpx;
}

.promotion-list {
  .promotion-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 26rpx 0;
    border-radius: 12rpx;
    transition: all 0.3s ease;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
    }
    
    &:active {
      background-color: rgba(0, 132, 255, 0.06);
    }
    
    .item-left {
      .discount-tag {
        display: inline-block;
        font-size: 24rpx;
        color: $error-color;
        background-color: rgba(237, 63, 20, 0.12);
        padding: 6rpx 16rpx;
        border-radius: 14rpx;
        margin-bottom: 10rpx;
        font-weight: 600;
      }
      
      .discount-desc {
        font-size: 28rpx;
        color: $text-color;
        font-weight: 500;
      }
    }
    
    .item-right {
      .get-btn {
        width: 148rpx;
        height: 56rpx;
        background: linear-gradient(135deg, $primary-color, #3399ff);
        color: $white;
        font-size: 26rpx;
        border-radius: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        padding: 0 20rpx;
        box-sizing: border-box;
        box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
        transition: all 0.3s ease;
        
        &:active {
          transform: translateY(2rpx);
          box-shadow: 0 3rpx 9rpx rgba(0, 132, 255, 0.25);
        }
      }
    }
  }
}

/* 推荐电站区域优化 */
.recommend-section {
  margin: 0 30rpx 20rpx;
  background-color: $white;
  border-radius: 16rpx;
  padding: 0 30rpx 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.recommend-section .section-title {
  padding: 30rpx 0 20rpx;
}

.station-list {
  .station-item {
    display: flex;
    padding: 28rpx 0;
    border-radius: 12rpx;
    transition: all 0.3s ease;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.08);
    }
    
    &:active {
      background-color: rgba(0, 132, 255, 0.06);
    }
    
    .station-image {
      width: 136rpx;
      height: 136rpx;
      border-radius: 12rpx;
      margin-right: 24rpx;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      object-fit: cover;
    }
    
    .station-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
      .station-name {
        font-size: 30rpx;
        font-weight: 600;
        color: $text-color;
        margin-bottom: 12rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .station-address {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16rpx;
        
        .icon-location {
          font-size: 26rpx;
          color: $primary-color;
          margin-right: 10rpx;
          line-height: 1.4;
        }
        
        .address-text {
          font-size: 26rpx;
          color: $text-color-secondary;
          flex: 1;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .station-tags {
        display: flex;
        margin-bottom: 16rpx;
        flex-wrap: wrap;
        
        .tag-item {
          font-size: 24rpx;
          padding: 4rpx 14rpx;
          border-radius: 12rpx;
          margin-right: 12rpx;
          margin-bottom: 8rpx;
          font-weight: 500;
          
          &.tag-fast {
            color: $primary-color;
            background-color: rgba(0, 132, 255, 0.12);
          }
          
          &.tag-free {
            color: $success-color;
            background-color: rgba(25, 190, 107, 0.12);
          }
          
          &.tag-discount {
            color: $warning-color;
            background-color: rgba(255, 153, 0, 0.12);
          }
        }
      }
      
      .station-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .price-text {
          font-size: 32rpx;
          color: $error-color;
          font-weight: 600;
        }
        
        .distance-text {
          font-size: 26rpx;
          color: $text-color-secondary;
          background-color: rgba(0, 0, 0, 0.06);
          padding: 6rpx 16rpx;
          border-radius: 14rpx;
        }
      }
    }
  }
}
</style>