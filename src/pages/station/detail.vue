<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="电站详情" />
    
    <!-- 电站图片轮播 -->
    <view class="station-banner">
      <swiper class="banner-swiper" indicator-dots autoplay interval="5000" duration="1000" circular indicator-active-color="#ffffff" indicator-color="rgba(255, 255, 255, 0.6)">
        <swiper-item v-for="(image, index) in stationImages" :key="index">
          <image class="banner-img" :src="image" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
      <!-- 轮播图底部渐变遮罩 -->
      <view class="banner-gradient"></view>
    </view>
    
    <!-- 电站基本信息 -->
    <view class="station-info-section">
      <view class="info-header">
        <view class="station-name">{{ stationInfo.name }}</view>
        <view class="station-rating">
          <text class="rating-text">{{ stationInfo.rating.toFixed(1) }}</text>
          <text class="rating-star">★</text>
          <text class="rating-count">({{ stationInfo.ratingCount }}条评价)</text>
        </view>
      </view>
      <view class="info-content">
        <view class="station-address">
          <text class="iconfont icon-location"></text>
          <text class="address-text">{{ stationInfo.address }}</text>
        </view>
        <view class="station-tags">
          <text class="tag-item tag-type">{{ stationInfo.type }}</text>
          <text class="tag-item tag-distance">{{ stationInfo.distance }}km</text>
        </view>
      </view>
      <view class="info-actions">
        <button class="action-btn" @click="callStation">
          <text class="iconfont icon-phone"></text>
          <text>联系电站</text>
        </button>
        <button class="action-btn" @click="navigateToStation">
          <text class="iconfont icon-navigation"></text>
          <text>导航前往</text>
        </button>
      </view>
    </view>
    
    <!-- 电站状态卡片 -->
    <view class="station-status-card">
      <view class="card-item">
        <view class="item-label">电站状态</view>
        <view class="item-value" :class="stationInfo.status === '空闲' ? 'value-free' : 'value-busy'">
          {{ stationInfo.status }}
        </view>
      </view>
      <view class="card-item">
        <view class="item-label">可用桩位</view>
        <view class="item-value">{{ stationInfo.freeCount }}/{{ stationInfo.totalCount }}</view>
      </view>
      <view class="card-item">
        <view class="item-label">充电功率</view>
        <view class="item-value">{{ stationInfo.power }}kW</view>
      </view>
      <view class="card-item">
        <view class="item-label">电费单价</view>
        <view class="item-value price">￥{{ stationInfo.price }}/度</view>
      </view>
    </view>
    
    <!-- 优惠活动模块 -->
    <view class="promotion-section">
      <view class="section-header">
        <text class="section-title">当前优惠</text>
        <text class="section-more" @click="goToPromotion">查看全部 ></text>
      </view>
      <view class="promotion-list">
        <view class="promotion-item" v-for="promo in promotions" :key="promo.id" @click="goToPromotionDetail(promo.id)">
          <text class="promo-tag">{{ promo.tag }}</text>
          <text class="promo-title">{{ promo.title }}</text>
        </view>
      </view>
    </view>
    
    <!-- 充电桩列表 -->
    <view class="charger-list-section">
      <view class="section-header">
        <text class="section-title">充电桩列表</text>
        <text class="section-subtitle">{{ stationInfo.freeCount }}个空闲桩位</text>
      </view>
      <view class="charger-list">
        <view class="charger-item" v-for="charger in chargerList" :key="charger.id">
          <view class="charger-info">
            <view class="charger-header">
              <view class="charger-name">{{ charger.name }}</view>
              <view class="charger-status" :class="`status-${getStatusClass(charger.status)}`">
                {{ getChargerStatusText(charger.status) }}
              </view>
            </view>
            <view class="charger-details">
              <text class="detail-item">类型: {{ charger.type }}</text>
              <text class="detail-item">功率: {{ charger.power }}kW</text>
              <text class="detail-item">费用: ￥{{ stationInfo.price }}/度</text>
            </view>
          </view>
          <view class="charger-action">
            <button 
              class="charge-btn" 
              :class="{ 'btn-disabled': charger.status !== '空闲' }"
              :disabled="charger.status !== '空闲'"
              @click="startCharging(charger.id)"
            >
              开始充电
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 电站详情信息 -->
    <view class="station-detail-section">
      <view class="section-header">
        <text class="section-title">电站详情</text>
      </view>
      <view class="detail-content">
        <view class="content-item">
          <text class="label">营业时间:</text>
          <text class="value">{{ stationInfo.openTime }}</text>
        </view>
        <view class="content-item">
          <text class="label">联系电话:</text>
          <text class="value">{{ stationInfo.phone }}</text>
        </view>
        <view class="content-item">
          <text class="label">电站类型:</text>
          <text class="value">{{ stationInfo.type }}</text>
        </view>
        <view class="content-item">
          <text class="label">支持车型:</text>
          <text class="value">{{ stationInfo.supportedVehicles }}</text>
        </view>
        <view class="content-item">
          <text class="label">支付方式:</text>
          <text class="value">{{ stationInfo.paymentMethods }}</text>
        </view>
      </view>
    </view>
    
    <!-- 地图位置 -->
    <view class="map-section">
      <view class="section-header">
        <text class="section-title">地图位置</text>
      </view>
      <view class="map-container">
        <image class="map-img" src="/static/logo.png" mode="aspectFill"></image>
        <view class="map-marker"></view>
      </view>
      <button class="map-action-btn" @click="navigateToStation">
        <text class="iconfont icon-navigation"></text>
        <text>开始导航</text>
      </button>
    </view>
    
    <!-- 用户评价 -->
    <view class="review-section">
      <view class="section-header">
        <text class="section-title">用户评价</text>
        <text class="section-more" @click="viewAllReviews">查看全部 ></text>
      </view>
      <view class="review-list">
        <view class="review-item" v-for="review in reviews" :key="review.id">
          <view class="review-header">
            <view class="user-info">
              <image class="user-avatar" src="/static/logo.png" mode="aspectFill"></image>
              <view class="user-details">
                <view class="user-name">{{ review.userName }}</view>
                <view class="review-date">{{ review.date }}</view>
              </view>
            </view>
            <view class="review-rating">
              <text class="rating-star">★</text>
              <text class="rating-text">{{ review.rating }}</text>
            </view>
          </view>
          <view class="review-content">{{ review.content }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface StationInfo {
  id: string
  name: string
  address: string
  distance: string
  status: string
  freeCount: number
  totalCount: number
  power: string
  price: string
  openTime: string
  phone: string
  type: string
  rating: number
  ratingCount: number
  supportedVehicles: string
  paymentMethods: string
}

interface Charger {
  id: string
  name: string
  status: '空闲' | '使用中' | '故障'
  type: string
  power: string
}

interface Promotion {
  id: string
  tag: string
  title: string
}

interface Review {
  id: string
  userName: string
  date: string
  rating: number
  content: string
}

// 电站图片
const stationImages = ref([
  'https://aimg8.dlssyht.cn/u/1810712/ueditor/image/906/1810712/1672372872136105.jpg',
  'https://ts1.tc.mm.bing.net/th/id/R-C.2e01c67dcc34f310e37d3b3919185d81?rik=wv3bTuzRYmJ0ig&riu=http%3a%2f%2fimage.dingdingzn.com%2f1+-+%e5%89%af%e6%9c%ac1606180515530&ehk=rdaqFJ6e4FiJaYyZGdQ9IAXu84kE2tqrK%2bzGZfhKr%2b8%3d&risl=&pid=ImgRaw&r=0',
  'https://pic.vjshi.com/2017-09-12/c4fffbb804596cc049dbe34995777db6/00001.jpg?x-oss-process=style/watermark'
])

// 电站信息
const stationInfo = ref<StationInfo>({
  id: '1',
  name: 'XX小区充电站',
  address: '北京市朝阳区XX路XX号',
  distance: '0.5',
  status: '空闲',
  freeCount: 8,
  totalCount: 10,
  power: '7.0',
  price: '1.2',
  openTime: '00:00-24:00',
  phone: '010-12345678',
  type: '快充',
  rating: 4.8,
  ratingCount: 156,
  supportedVehicles: '所有车型',
  paymentMethods: '微信支付、支付宝、银联'
})

// 充电桩列表
const chargerList = ref<Charger[]>([
  {
    id: '101',
    name: '充电桩01',
    status: '空闲',
    type: '快充',
    power: '7.0'
  },
  {
    id: '102',
    name: '充电桩02',
    status: '使用中',
    type: '快充',
    power: '7.0'
  },
  {
    id: '103',
    name: '充电桩03',
    status: '空闲',
    type: '慢充',
    power: '3.5'
  },
  {
    id: '104',
    name: '充电桩04',
    status: '故障',
    type: '快充',
    power: '7.0'
  }
])

// 优惠活动
const promotions = ref<Promotion[]>([
  {
    id: '1',
    tag: '新用户专享',
    title: '首次充电立减2元'
  },
  {
    id: '2',
    tag: '限时特惠',
    title: '夜间充电8折优惠'
  },
  {
    id: '3',
    tag: '会员专享',
    title: '月卡会员充电9折'
  }
])

// 用户评价
const reviews = ref<Review[]>([
  {
    id: '1',
    userName: '张三',
    date: '2023-10-10',
    rating: 5,
    content: '这个充电站位置很好找，充电桩很多，充电速度也很快，非常方便！'
  },
  {
    id: '2',
    userName: '李四',
    date: '2023-10-08',
    rating: 4,
    content: '整体还不错，就是有时候会排队，希望能多增加几个充电桩。'
  }
])

// 获取充电桩状态类名
const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    空闲: 'idle',
    使用中: 'using',
    故障: 'fault'
  }
  return statusMap[status] || 'unknown'
}

// 获取充电桩状态文本
const getChargerStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    空闲: '空闲',
    使用中: '使用中',
    故障: '故障'
  }
  return statusMap[status] || '未知'
}

// 开始充电
const startCharging = (chargerId: string) => {
  // @ts-ignore
  uni.showModal({
    title: '确认充电',
    content: '确定要开始充电吗？',
    success: function (res) {
      if (res.confirm) {
        // @ts-ignore
        uni.navigateTo({
          url: '/pages/charge/control?id=' + chargerId
        })
      }
    }
  })
}

// 联系电站
const callStation = () => {
  // @ts-ignore
  uni.makePhoneCall({
    phoneNumber: stationInfo.value.phone
  })
}

// 导航前往
const navigateToStation = () => {
  // @ts-ignore
  uni.showToast({
    title: '导航功能开发中',
    icon: 'none'
  })
}

// 跳转到优惠活动列表
const goToPromotion = () => {
  // @ts-ignore
  uni.navigateTo({
    url: '/pages/promotion/list'
  })
}

// 跳转到优惠活动详情
const goToPromotionDetail = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/promotion/detail?id=${id}`
  })
}

// 查看全部评价
const viewAllReviews = () => {
  // @ts-ignore
  uni.showToast({
    title: '评价详情功能开发中',
    icon: 'none'
  })
}

// 获取页面参数
onMounted(() => {
  // @ts-ignore
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  const stationId = options.id || ''
  
  // 这里可以根据stationId请求详细信息
  console.log('电站ID:', stationId)
  
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '电站详情'
  })
})
</script>

<style lang="scss" scoped>
/* 导入变量和混合宏 */
@import '@/styles/variables.scss';

.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 40rpx;
  box-sizing: border-box;
  
  /* 为各模块添加入场动画 */
  .station-info-section,
  .station-status-card,
  .promotion-section,
  .charger-list-section,
  .station-detail-section,
  .map-section,
  .review-section {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
    transform: translateY(20rpx);
  }
  
  .station-info-section {
    animation-delay: 0.1s;
  }
  
  .station-status-card {
    animation-delay: 0.2s;
  }
  
  .promotion-section {
    animation-delay: 0.3s;
  }
  
  .charger-list-section {
    animation-delay: 0.4s;
  }
  
  .station-detail-section {
    animation-delay: 0.5s;
  }
  
  .map-section {
    animation-delay: 0.6s;
  }
  
  .review-section {
    animation-delay: 0.7s;
  }
}

/* 电站图片轮播 */
.station-banner {
  height: 360rpx;
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 0 0 32rpx 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
  
  .banner-swiper {
    height: 100%;
    
    .banner-img {
      width: 100%;
      height: 100%;
      background-color: #e8ecf2;
    }
  }
  
  /* 轮播图底部渐变遮罩 */
  .banner-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.2));
    pointer-events: none;
  }
}

/* 电站基本信息 */
.station-info-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: -40rpx 30rpx 32rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid $border-color-light;
  position: relative;
  overflow: hidden;
  z-index: 10;
  
  /* 卡片顶部装饰 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6rpx;
    background: linear-gradient(90deg, $primary-color, #3399ff, #66b3ff);
  }
  
  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 28rpx;
    
    .station-name {
      font-size: 42rpx;
      font-weight: 800;
      color: $text-color;
      line-height: 1.3;
      flex: 1;
      margin-right: 24rpx;
      background: linear-gradient(135deg, $text-color, $text-color-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .station-rating {
      display: flex;
      align-items: center;
      background: linear-gradient(135deg, rgba(255, 153, 0, 0.15), rgba(255, 153, 0, 0.08));
      padding: 14rpx 24rpx;
      border-radius: 24rpx;
      border: 1rpx solid rgba(255, 153, 0, 0.2);
      
      .rating-text {
        font-size: 30rpx;
        font-weight: 700;
        color: $warning-color;
        margin-right: 8rpx;
      }
      
      .rating-star {
        font-size: 26rpx;
        color: $warning-color;
        margin-right: 10rpx;
      }
      
      .rating-count {
        font-size: 24rpx;
        color: $text-color-tertiary;
      }
    }
  }
  
  .info-content {
    margin-bottom: 32rpx;
    
    .station-address {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20rpx;
      
      .icon-location {
        font-size: 30rpx;
        color: $primary-color;
        margin-right: 14rpx;
        line-height: 1.5;
      }
      
      .address-text {
        font-size: 28rpx;
        color: $text-color-secondary;
        flex: 1;
        line-height: 1.5;
      }
    }
    
    .station-tags {
      display: flex;
      gap: 16rpx;
      
      .tag-item {
        font-size: 26rpx;
        padding: 10rpx 22rpx;
        border-radius: 20rpx;
        font-weight: 600;
        box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
        
        &.tag-type {
          color: $primary-color;
          background: linear-gradient(135deg, rgba(0, 132, 255, 0.15), rgba(0, 132, 255, 0.08));
        }
        
        &.tag-distance {
          color: $success-color;
          background: linear-gradient(135deg, rgba(25, 190, 107, 0.15), rgba(25, 190, 107, 0.08));
        }
      }
    }
  }
  
  .info-actions {
    display: flex;
    gap: 24rpx;
    
    .action-btn {
      flex: 1;
      height: 80rpx;
      background: linear-gradient(135deg, $primary-color, #3399ff);
      border: none;
      border-radius: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12rpx;
      font-size: 28rpx;
      color: $white;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.35);
      
      .iconfont {
        font-size: 30rpx;
      }
      
      &:active {
        transform: translateY(2rpx) scale(0.98);
        box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.25);
      }
      
      /* 第二个按钮样式 */
      &:nth-child(2) {
        background: linear-gradient(135deg, #ffffff, #f0f2f5);
        color: $primary-color;
        border: 1rpx solid $border-color-light;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
        
        &:active {
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
}

/* 电站状态卡片 */
.station-status-card {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  padding: 36rpx 24rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  gap: 20rpx;
  
  .card-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 16rpx;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 16rpx;
    border: 1rpx solid $border-color-light;
    transition: all 0.3s ease;
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
    }
    
    .item-label {
      font-size: 26rpx;
      color: $text-color-tertiary;
      margin-bottom: 16rpx;
      font-weight: 600;
    }
    
    .item-value {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
      
      &.value-free {
        color: $success-color;
      }
      
      &.value-busy {
        color: $warning-color;
      }
      
      &.price {
        color: $error-color;
        font-size: 38rpx;
        background: linear-gradient(135deg, $error-color, #ff6b6b);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
}

/* 优惠活动模块 */
.promotion-section {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  margin: 0 30rpx 32rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 132, 255, 0.12);
  border: 1rpx solid rgba(0, 132, 255, 0.2);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28rpx;
    
    .section-title {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
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
    
    .section-more {
      font-size: 28rpx;
      color: $primary-color;
      transition: all 0.3s ease;
      font-weight: 500;
      
      &:active {
        transform: translateX(4rpx);
      }
    }
  }
  
  .promotion-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    
    .promotion-item {
      background: linear-gradient(135deg, rgba(0, 132, 255, 0.08), rgba(0, 132, 255, 0.04));
      padding: 28rpx;
      border-radius: 16rpx;
      border: 1rpx solid rgba(0, 132, 255, 0.2);
      transition: all 0.3s ease;
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 6rpx 16rpx rgba(0, 132, 255, 0.12);
      }
      
      .promo-tag {
        display: inline-block;
        font-size: 24rpx;
        color: $error-color;
        background: linear-gradient(135deg, rgba(237, 63, 20, 0.15), rgba(237, 63, 20, 0.08));
        padding: 8rpx 20rpx;
        border-radius: 16rpx;
        margin-bottom: 16rpx;
        font-weight: 600;
      }
      
      .promo-title {
        font-size: 30rpx;
        color: $text-color;
        font-weight: 600;
        line-height: 1.4;
      }
    }
  }
}

/* 充电桩列表 */
.charger-list-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36rpx;
    
    .section-title {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
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
    
    .section-subtitle {
      font-size: 28rpx;
      color: $success-color;
      font-weight: 600;
      background: rgba(25, 190, 107, 0.1);
      padding: 8rpx 20rpx;
      border-radius: 20rpx;
    }
  }
  
  .charger-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    
    .charger-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
      padding: 36rpx;
      border-radius: 18rpx;
      border: 1rpx solid $border-color-light;
      transition: all 0.3s ease;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 8rpx;
        height: 100%;
        background: linear-gradient(180deg, $primary-color, #3399ff);
        border-radius: 4rpx 0 0 4rpx;
      }
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.12);
      }
      
      .charger-info {
        flex: 1;
        margin-right: 24rpx;
        
        .charger-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;
          
          .charger-name {
            font-size: 32rpx;
            font-weight: 700;
            color: $text-color;
          }
          
          .charger-status {
            font-size: 26rpx;
            padding: 10rpx 24rpx;
            border-radius: 20rpx;
            font-weight: 600;
            
            &.status-idle {
              background: linear-gradient(135deg, rgba(25, 190, 107, 0.2), rgba(25, 190, 107, 0.1));
              color: $success-color;
            }
            
            &.status-using {
              background: linear-gradient(135deg, rgba(255, 153, 0, 0.2), rgba(255, 153, 0, 0.1));
              color: $warning-color;
            }
            
            &.status-fault {
              background: linear-gradient(135deg, rgba(237, 63, 20, 0.2), rgba(237, 63, 20, 0.1));
              color: $error-color;
            }
          }
        }
        
        .charger-details {
          display: flex;
          flex-wrap: wrap;
          gap: 28rpx;
          
          .detail-item {
            font-size: 26rpx;
            color: $text-color-secondary;
            font-weight: 500;
          }
        }
      }
      
      .charger-action {
        .charge-btn {
          width: 180rpx;
          height: 72rpx;
          background: linear-gradient(135deg, $primary-color, #3399ff);
          color: $white;
          font-size: 28rpx;
          font-weight: 600;
          border-radius: 36rpx;
          border: none;
          box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.35);
          transition: all 0.3s ease;
          
          &:active {
            transform: scale(0.96);
            box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.25);
          }
          
          &.btn-disabled {
            background: linear-gradient(135deg, $gray-3, $gray-4);
            color: $gray-6;
            box-shadow: none;
          }
        }
      }
    }
  }
}

/* 电站详情信息 */
.station-detail-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    margin-bottom: 36rpx;
    
    .section-title {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
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
  
  .detail-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28rpx 40rpx;
    
    .content-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8rpx;
      
      .label {
        font-size: 26rpx;
        color: $text-color-tertiary;
        font-weight: 600;
      }
      
      .value {
        font-size: 28rpx;
        color: $text-color;
        font-weight: 600;
        background: linear-gradient(135deg, $text-color, $text-color-secondary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
  }
}

/* 地图位置 */
.map-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 32rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    margin-bottom: 32rpx;
    
    .section-title {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
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
  
  .map-container {
    height: 360rpx;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 16rpx;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    margin-bottom: 24rpx;
    
    .map-img {
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }
    
    .map-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50rpx;
      height: 50rpx;
      background-color: $primary-color;
      border-radius: 50%;
      box-shadow: 0 6rpx 20rpx rgba(0, 132, 255, 0.5);
      border: 8rpx solid $white;
      animation: pulse 2s infinite;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24rpx;
        height: 24rpx;
        background-color: $white;
        border-radius: 50%;
      }
    }
  }
  
  /* 地图操作按钮 */
  .map-action-btn {
    width: 100%;
    height: 80rpx;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    color: $white;
    font-size: 28rpx;
    font-weight: 600;
    border: none;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.35);
    transition: all 0.3s ease;
    
    .iconfont {
      font-size: 30rpx;
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.25);
    }
  }
}

/* 用户评价 */
.review-section {
  background: linear-gradient(135deg, #fffaf0 0%, #fef3c7 100%);
  margin: 0 30rpx 60rpx;
  padding: 36rpx;
  border-radius: 20rpx;
  box-shadow: 0 6rpx 20rpx rgba(255, 153, 0, 0.08);
  border: 1rpx solid rgba(255, 153, 0, 0.2);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 36rpx;
    
    .section-title {
      font-size: 34rpx;
      font-weight: 700;
      color: $text-color;
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
    
    .section-more {
      font-size: 28rpx;
      color: $primary-color;
      transition: all 0.3s ease;
      font-weight: 500;
      
      &:active {
        transform: translateX(4rpx);
      }
    }
  }
  
  .review-list {
    display: flex;
    flex-direction: column;
    gap: 36rpx;
    
    .review-item {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.9));
      padding: 36rpx;
      border-radius: 18rpx;
      border: 1rpx solid rgba(255, 153, 0, 0.2);
      box-shadow: 0 4rpx 16rpx rgba(255, 153, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 6rpx;
        height: 100%;
        background: linear-gradient(180deg, $warning-color, #ffb74d);
        border-radius: 3rpx 0 0 3rpx;
      }
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 8rpx 24rpx rgba(255, 153, 0, 0.15);
      }
      
      .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24rpx;
        
        .user-info {
          display: flex;
          align-items: center;
          
          .user-avatar {
            width: 72rpx;
            height: 72rpx;
            border-radius: 50%;
            margin-right: 20rpx;
            background-color: $white;
            border: 3rpx solid $border-color-light;
            box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
          }
          
          .user-details {
            .user-name {
              font-size: 30rpx;
              font-weight: 700;
              color: $text-color;
              margin-bottom: 6rpx;
            }
            
            .review-date {
              font-size: 24rpx;
              color: $text-color-tertiary;
            }
          }
        }
        
        .review-rating {
          display: flex;
          align-items: center;
          gap: 8rpx;
          
          .rating-star {
            font-size: 32rpx;
            color: $warning-color;
            margin-right: 8rpx;
          }
          
          .rating-text {
            font-size: 28rpx;
            font-weight: 700;
            color: $warning-color;
          }
        }
      }
      
      .review-content {
        font-size: 28rpx;
        color: $text-color-secondary;
        line-height: 1.7;
        background: rgba(0, 0, 0, 0.02);
        padding: 24rpx;
        border-radius: 12rpx;
        border-left: 4rpx solid $primary-color;
      }
    }
  }
}

/* 动画效果 */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 132, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20rpx rgba(0, 132, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 132, 255, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>