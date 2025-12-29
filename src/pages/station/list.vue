<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="附近电站" />
    
    <!-- 筛选条件 -->
    <view class="filter-section">
      <scroll-view class="filter-scroll" scroll-x show-scrollbar="false">
        <view class="filter-list">
          <view class="filter-item active" @click="switchFilter('all')">全部</view>
          <view class="filter-item" @click="switchFilter('fast')">快充</view>
          <view class="filter-item" @click="switchFilter('slow')">慢充</view>
          <view class="filter-item" @click="switchFilter('free')">空闲</view>
          <view class="filter-item" @click="switchFilter('distance')">距离近</view>
          <view class="filter-item" @click="switchFilter('rating')">评分高</view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 电站列表 -->
    <view class="station-list">
      <view class="station-item" v-for="station in stationList" :key="station.id" @click="goToStationDetail(station.id)">
        <view class="item-header">
          <view class="station-name">{{ station.name }}</view>
          <view class="station-distance">{{ station.distance }}km</view>
        </view>
        <view class="item-content">
          <view class="content-left">
            <view class="station-address">
              <text class="iconfont icon-location"></text>
              <text class="address-text">{{ station.address }}</text>
            </view>
            <view class="station-info">
              <text class="info-item info-type">{{ station.type }}</text>
              <text class="info-item info-power">{{ station.power }}kW</text>
              <text class="info-item info-price">￥{{ station.price }}/度</text>
            </view>
          </view>
          <view class="content-right">
            <view class="station-status" :class="station.status === '空闲' ? 'status-free' : 'status-busy'">
              {{ station.status }}
            </view>
            <view class="station-count">
              {{ station.freeCount }}/{{ station.totalCount }}
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-section" v-if="stationList.length === 0">
      <image class="empty-img" src="/static/logo.png" mode="aspectFit"></image>
      <view class="empty-text">暂无电站信息</view>
      <view class="empty-desc">换个筛选条件试试吧</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface Station {
  id: string
  name: string
  distance: string
  address: string
  type: string
  power: string
  price: string
  status: string
  freeCount: number
  totalCount: number
}

const stationList = ref<Station[]>([
  {
    id: '1',
    name: 'XX小区充电站',
    distance: '0.5',
    address: '北京市朝阳区XX路XX号',
    type: '快充',
    power: '7.0',
    price: '1.2',
    status: '空闲',
    freeCount: 8,
    totalCount: 10
  },
  {
    id: '2',
    name: 'YY商场充电站',
    distance: '1.2',
    address: '北京市朝阳区YY路YY号',
    type: '快充',
    power: '7.0',
    price: '1.5',
    status: '繁忙',
    freeCount: 2,
    totalCount: 12
  },
  {
    id: '3',
    name: 'ZZ大厦充电站',
    distance: '2.1',
    address: '北京市朝阳区ZZ路ZZ号',
    type: '慢充',
    power: '3.5',
    price: '0.8',
    status: '空闲',
    freeCount: 5,
    totalCount: 8
  }
])

// 当前选中的筛选条件
const currentFilter = ref('all')

// 切换筛选条件
const switchFilter = (filter: string) => {
  currentFilter.value = filter
  // 这里可以添加筛选逻辑
}

// 跳转到电站详情
const goToStationDetail = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/station/detail?id=${id}`
  })
}

// 下拉刷新
onMounted(() => {
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '附近电站'
  })
})
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 20rpx;
}

/* 筛选条件优化 */
.filter-section {
  background-color: $white;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 90;
  
  .filter-scroll {
    white-space: nowrap;
    
    .filter-list {
      display: inline-block;
      padding: 0 30rpx;
      
      .filter-item {
        display: inline-block;
        padding: 15rpx 30rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: $text-color-secondary;
        background-color: rgba(0, 0, 0, 0.06);
        border-radius: 30rpx;
        margin-right: 20rpx;
        transition: all 0.3s ease;
        
        &:active {
          transform: scale(0.95);
        }
        
        &.active {
          background: linear-gradient(135deg, $primary-color, #3399ff);
          color: $white;
          box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
        }
      }
    }
  }
}

/* 电站列表优化 */
.station-list {
  padding: 0 30rpx;
}

.station-item {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  transition: all 0.3s ease;
  
  &:active {
    transform: translateY(2rpx);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    
    .station-name {
      font-size: 32rpx;
      font-weight: 600;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 400rpx;
    }
    
    .station-distance {
      font-size: 26rpx;
      color: $text-color-secondary;
      background-color: rgba(0, 132, 255, 0.1);
      padding: 6rpx 16rpx;
      border-radius: 16rpx;
    }
  }
  
  .item-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    
    .content-left {
      flex: 1;
      
      .station-address {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        
        .icon-location {
          font-size: 28rpx;
          color: $primary-color;
          margin-right: 12rpx;
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
      
      .station-info {
        display: flex;
        flex-wrap: wrap;
        
        .info-item {
          font-size: 24rpx;
          font-weight: 500;
          padding: 6rpx 16rpx;
          border-radius: 14rpx;
          margin-right: 16rpx;
          margin-bottom: 12rpx;
          
          &:last-child {
            margin-right: 0;
          }
          
          &.info-type {
            color: $primary-color;
            background-color: rgba(0, 132, 255, 0.12);
          }
          
          &.info-power {
            color: $success-color;
            background-color: rgba(25, 190, 107, 0.12);
          }
          
          &.info-price {
            color: $error-color;
            background-color: rgba(237, 63, 20, 0.12);
          }
        }
      }
    }
    
    .content-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      
      .station-status {
        font-size: 26rpx;
        font-weight: 600;
        padding: 8rpx 20rpx;
        border-radius: 18rpx;
        margin-bottom: 16rpx;
        
        &.status-free {
          background-color: rgba(25, 190, 107, 0.15);
          color: $success-color;
        }
        
        &.status-busy {
          background-color: rgba(255, 153, 0, 0.15);
          color: $warning-color;
        }
      }
      
      .station-count {
        font-size: 26rpx;
        color: $text-color-secondary;
        background-color: rgba(0, 0, 0, 0.06);
        padding: 6rpx 16rpx;
        border-radius: 14rpx;
      }
    }
  }
}

/* 空状态优化 */
.empty-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  
  .empty-img {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
    opacity: 0.6;
  }
  
  .empty-text {
    font-size: 32rpx;
    font-weight: 500;
    color: $text-color-secondary;
    margin-bottom: 12rpx;
  }
  
  .empty-desc {
    font-size: 26rpx;
    color: $text-color-tertiary;
  }
}
</style>