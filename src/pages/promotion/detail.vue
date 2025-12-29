<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="活动详情" />
    
    <!-- 活动图片 -->
    <view class="promotion-banner">
      <image class="banner-img" :src="promotion.image" mode="aspectFill"></image>
    </view>
    
    <!-- 活动基本信息 -->
    <view class="promotion-info-section">
      <view class="info-header">
        <view class="promotion-tag" :class="getTagClass(promotion.tag)">
          {{ promotion.tag }}
        </view>
        <view class="promotion-title">{{ promotion.title }}</view>
        <view class="promotion-desc">{{ promotion.description }}</view>
      </view>
      
      <!-- 活动时间 -->
      <view class="promotion-time">
        <text class="time-label">活动时间:</text>
        <text class="time-value">{{ promotion.startTime }} - {{ promotion.endTime }}</text>
      </view>
      
      <!-- 活动状态 -->
      <view class="promotion-status" :class="getPromotionStatusClass(promotion.status)">
        {{ getPromotionStatusText(promotion.status) }}
      </view>
    </view>
    
    <!-- 活动详情 -->
    <view class="promotion-detail-section">
      <view class="section-header">
        <text class="section-title">活动详情</text>
      </view>
      <view class="detail-content">
        <rich-text :nodes="promotion.detail"></rich-text>
      </view>
    </view>
    
    <!-- 活动规则 -->
    <view class="promotion-rules-section">
      <view class="section-header">
        <text class="section-title">活动规则</text>
      </view>
      <view class="rules-list">
        <view class="rule-item" v-for="(rule, index) in promotion.rules" :key="index">
          <text class="rule-index">{{ index + 1 }}</text>
          <text class="rule-content">{{ rule }}</text>
        </view>
      </view>
    </view>
    
    <!-- 适用电站 -->
    <view class="applicable-stations-section">
      <view class="section-header">
        <text class="section-title">适用电站</text>
      </view>
      <view class="stations-list">
        <view class="station-item" v-for="station in applicableStations" :key="station.id">
          <view class="station-info">
            <view class="station-name">{{ station.name }}</view>
            <view class="station-address">{{ station.address }}</view>
          </view>
          <view class="station-action">
            <button class="go-btn" @click="goToStationDetail(station.id)">
              查看详情
            </button>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-action-bar">
      <button class="apply-btn" :disabled="!canApply" @click="applyPromotion">
        {{ canApply ? '立即参与' : getPromotionStatusText(promotion.status) }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface Promotion {
  id: string
  title: string
  description: string
  tag: string
  image: string
  startTime: string
  endTime: string
  status: 'ongoing' | 'upcoming' | 'ended'
  detail: string
  rules: string[]
  applicableStations: string[]
  usageCount: number
}

interface Station {
  id: string
  name: string
  address: string
}

// 活动信息
const promotion = ref<Promotion>({
  id: '1',
  title: '首次充电立减2元',
  description: '新用户专享，首次充电即可享受立减2元优惠',
  tag: '新用户专享',
  image: 'https://aimg8.dlssyht.cn/u/1810712/ueditor/image/906/1810712/1672372872136105.jpg',
  startTime: '2023-10-01',
  endTime: '2023-12-31',
  status: 'ongoing',
  detail: '<p>欢迎使用我们的充电服务！为了感谢新用户的支持，我们特别推出了首次充电立减2元的优惠活动。</p><p>活动期间，新用户首次充电即可享受立减2元的优惠，不限充电时长和电量。</p><p>机会难得，快来体验我们便捷、高效、安全的充电服务吧！</p>',
  rules: [
    '活动仅限新用户参与',
    '每个用户仅限参与一次',
    '活动有效期至2023年12月31日',
    '最终解释权归本公司所有'
  ],
  applicableStations: ['1', '2', '3'],
  usageCount: 1256
})

// 适用电站列表
const applicableStations = ref<Station[]>([
  {
    id: '1',
    name: 'XX小区充电站',
    address: '北京市朝阳区XX路XX号'
  },
  {
    id: '2',
    name: 'YY商场充电站',
    address: '北京市海淀区YY路YY号'
  },
  {
    id: '3',
    name: 'ZZ科技园充电站',
    address: '北京市昌平区ZZ路ZZ号'
  }
])

// 获取标签样式类名
const getTagClass = (tag: string) => {
  const tagMap: Record<string, string> = {
    '新用户专享': 'tag-new',
    '会员专享': 'tag-member',
    '限时特惠': 'tag-limited',
    '节日活动': 'tag-festival'
  }
  return tagMap[tag] || 'tag-default'
}

// 获取活动状态样式类名
const getPromotionStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'ongoing': 'status-ongoing',
    'upcoming': 'status-upcoming',
    'ended': 'status-ended'
  }
  return statusMap[status] || ''
}

// 获取活动状态文本
const getPromotionStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'ongoing': '进行中',
    'upcoming': '即将开始',
    'ended': '已结束'
  }
  return statusMap[status] || '未知'
}

// 计算是否可以参与活动
const canApply = computed(() => {
  return promotion.value.status === 'ongoing'
})

// 跳转到电站详情
const goToStationDetail = (stationId: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/station/detail?id=${stationId}`
  })
}

// 参与活动
const applyPromotion = () => {
  // @ts-ignore
  uni.showToast({
    title: '参与活动成功',
    icon: 'success'
  })
}

// 获取页面参数
onMounted(() => {
  // @ts-ignore
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  const promotionId = options.id || ''
  
  // 这里可以根据promotionId请求详细信息
  console.log('活动ID:', promotionId)
  
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '活动详情'
  })
})
</script>

<style lang="scss" scoped>
/* 导入变量和混合宏 */
@import '@/styles/variables.scss';

.container {
  background-color: $background-color;
  min-height: 100vh;
  position: relative;
}

/* 活动图片 */
.promotion-banner {
  height: 360rpx;
  width: 100%;
  overflow: hidden;
  position: relative;
  
  .banner-img {
    width: 100%;
    height: 100%;
    background-color: #e8ecf2;
  }
}

/* 活动基本信息 */
.promotion-info-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 20rpx 30rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .info-header {
    margin-bottom: 24rpx;
    
    .promotion-tag {
      display: inline-block;
      font-size: 24rpx;
      padding: 8rpx 20rpx;
      border-radius: 16rpx;
      font-weight: 600;
      margin-bottom: 16rpx;
      
      &.tag-new {
        color: $error-color;
        background-color: rgba(237, 63, 20, 0.12);
      }
      
      &.tag-member {
        color: $primary-color;
        background-color: rgba(0, 132, 255, 0.12);
      }
      
      &.tag-limited {
        color: $warning-color;
        background-color: rgba(255, 153, 0, 0.12);
      }
      
      &.tag-festival {
        color: $success-color;
        background-color: rgba(25, 190, 107, 0.12);
      }
      
      &.tag-default {
        color: $text-color-secondary;
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
    
    .promotion-title {
      font-size: 36rpx;
      font-weight: 600;
      color: $text-color;
      line-height: 1.3;
      margin-bottom: 16rpx;
    }
    
    .promotion-desc {
      font-size: 28rpx;
      color: $text-color-secondary;
      line-height: 1.5;
    }
  }
  
  .promotion-time {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .time-label {
      font-size: 26rpx;
      color: $text-color-tertiary;
      margin-right: 16rpx;
      font-weight: 500;
    }
    
    .time-value {
      font-size: 26rpx;
      color: $text-color-secondary;
      font-weight: 500;
    }
  }
  
  .promotion-status {
    display: inline-block;
    font-size: 24rpx;
    padding: 8rpx 20rpx;
    border-radius: 16rpx;
    font-weight: 500;
    
    &.status-ongoing {
      background-color: rgba(25, 190, 107, 0.15);
      color: $success-color;
    }
    
    &.status-upcoming {
      background-color: rgba(0, 132, 255, 0.15);
      color: $primary-color;
    }
    
    &.status-ended {
      background-color: rgba(0, 0, 0, 0.08);
      color: $text-color-tertiary;
    }
  }
}

/* 活动详情 */
.promotion-detail-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 20rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    margin-bottom: 28rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
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
  }
  
  .detail-content {
    .rich-text {
      font-size: 28rpx;
      color: $text-color-secondary;
      line-height: 1.8;
    }
  }
}

/* 活动规则 */
.promotion-rules-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 20rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    margin-bottom: 28rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
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
  }
  
  .rules-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    
    .rule-item {
      display: flex;
      align-items: flex-start;
      
      .rule-index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        background: linear-gradient(135deg, $primary-color, #3399ff);
        color: $white;
        font-size: 22rpx;
        font-weight: 600;
        border-radius: 50%;
        margin-right: 20rpx;
        flex-shrink: 0;
        margin-top: 4rpx;
      }
      
      .rule-content {
        flex: 1;
        font-size: 26rpx;
        color: $text-color-secondary;
        line-height: 1.6;
      }
    }
  }
}

/* 适用电站 */
.applicable-stations-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin: 0 30rpx 120rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-header {
    margin-bottom: 28rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
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
  }
  
  .stations-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    
    .station-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.8);
      padding: 28rpx;
      border-radius: 12rpx;
      border: 1rpx solid $border-color-light;
      transition: all 0.3s ease;
      
      &:active {
        transform: translateY(2rpx);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      }
      
      .station-info {
        flex: 1;
        margin-right: 20rpx;
        
        .station-name {
          font-size: 30rpx;
          font-weight: 600;
          color: $text-color;
          margin-bottom: 8rpx;
        }
        
        .station-address {
          font-size: 24rpx;
          color: $text-color-secondary;
          line-height: 1.5;
        }
      }
      
      .station-action {
        .go-btn {
          width: 140rpx;
          height: 60rpx;
          background: linear-gradient(135deg, $primary-color, #3399ff);
          color: $white;
          font-size: 24rpx;
          font-weight: 600;
          border-radius: 30rpx;
          border: none;
          box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
          transition: all 0.3s ease;
          
          &:active {
            transform: scale(0.95);
            box-shadow: 0 3rpx 9rpx rgba(0, 132, 255, 0.25);
          }
        }
      }
    }
  }
}

/* 底部操作栏 */
.bottom-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.95) 100%);
  padding: 20rpx 30rpx 40rpx;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10rpx);
  z-index: 100;
  
  .apply-btn {
    width: 100%;
    height: 88rpx;
    background: linear-gradient(135deg, $primary-color, #3399ff);
    color: $white;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 44rpx;
    border: none;
    box-shadow: 0 8rpx 24rpx rgba(0, 132, 255, 0.4);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(0, 132, 255, 0.3);
    }
    
    &:disabled {
      background: linear-gradient(135deg, $gray-3, $gray-4);
      color: $gray-6;
      box-shadow: none;
    }
  }
}
</style>