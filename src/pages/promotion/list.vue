<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="优惠活动" />
    
    <!-- 搜索区域 -->
    <view class="search-section">
      <view class="search-box">
        <text class="iconfont icon-search"></text>
        <input 
          class="search-input" 
          placeholder="搜索优惠活动" 
          confirm-type="search"
          @confirm="handleSearch"
        />
      </view>
    </view>
    
    <!-- 活动分类 -->
    <view class="category-section">
      <scroll-view class="category-scroll" scroll-x show-scrollbar="false">
        <view class="category-list">
          <view 
            class="category-item" 
            :class="{ active: currentCategory === 'all' }" 
            @click="switchCategory('all')"
          >
            全部活动
          </view>
          <view 
            class="category-item" 
            :class="{ active: currentCategory === 'new' }" 
            @click="switchCategory('new')"
          >
            新用户专享
          </view>
          <view 
            class="category-item" 
            :class="{ active: currentCategory === 'member' }" 
            @click="switchCategory('member')"
          >
            会员专享
          </view>
          <view 
            class="category-item" 
            :class="{ active: currentCategory === 'limited' }" 
            @click="switchCategory('limited')"
          >
            限时特惠
          </view>
          <view 
            class="category-item" 
            :class="{ active: currentCategory === 'holiday' }" 
            @click="switchCategory('holiday')"
          >
            节日活动
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 活动列表 -->
    <view class="promotion-list">
      <view 
        class="promotion-item" 
        v-for="promo in promotionList" 
        :key="promo.id"
        @click="goToPromotionDetail(promo.id)"
      >
        <image class="promo-image" :src="promo.image" mode="aspectFill"></image>
        <view class="promo-info">
          <view class="promo-header">
            <view class="promo-tag" :class="`tag-${promo.tagType}`">{{ promo.tag }}</view>
            <view class="promo-time">{{ promo.time }}</view>
          </view>
          <view class="promo-title">{{ promo.title }}</view>
          <view class="promo-desc">{{ promo.desc }}</view>
          <view class="promo-footer">
            <view class="promo-usage">
              <text class="usage-count">{{ promo.usageCount }}人已使用</text>
              <text class="usage-rate">使用率{{ promo.usageRate }}%</text>
            </view>
            <view class="promo-action">
              <button 
                class="action-btn"
                :disabled="promo.status !== 'active'"
              >
                {{ promo.status === 'active' ? '立即领取' : '已结束' }}
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 空状态 -->
    <view class="empty-section" v-if="promotionList.length === 0">
      <image class="empty-img" src="/static/logo.png" mode="aspectFit"></image>
      <view class="empty-text">暂无优惠活动</view>
      <view class="empty-desc">请稍后再来查看</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

interface Promotion {
  id: string
  image: string
  tag: string
  tagType: string
  title: string
  desc: string
  time: string
  status: string
  usageCount: number
  usageRate: number
}

// 当前分类
const currentCategory = ref('all')

// 优惠活动列表
const promotionList = ref<Promotion[]>([
  {
    id: '1',
    image: 'https://aimg8.dlssyht.cn/u/1810712/ueditor/image/906/1810712/1672372872136105.jpg',
    tag: '新用户专享',
    tagType: 'new',
    title: '首次充电立减2元',
    desc: '新用户注册即可领取2元充电优惠券，有效期7天',
    time: '2023-10-01 至 2023-12-31',
    status: 'active',
    usageCount: 1563,
    usageRate: 85
  },
  {
    id: '2',
    image: 'https://ts1.tc.mm.bing.net/th/id/R-C.2e01c67dcc34f310e37d3b3919185d81?rik=wv3bTuzRYmJ0ig&riu=http%3a%2f%2fimage.dingdingzn.com%2f1+-+%e5%89%af%e6%9c%ac1606180515530&ehk=rdaqFJ6e4FiJaYyZGdQ9IAXu84kE2tqrK%2bzGZfhKr%2b8%3d&risl=&pid=ImgRaw&r=0',
    tag: '限时特惠',
    tagType: 'limited',
    title: '夜间充电8折优惠',
    desc: '每天22:00至次日6:00充电享受8折优惠，不限次数',
    time: '2023-10-10 至 2023-11-10',
    status: 'active',
    usageCount: 2345,
    usageRate: 78
  },
  {
    id: '3',
    image: 'https://pic.vjshi.com/2017-09-12/c4fffbb804596cc049dbe34995777db6/00001.jpg?x-oss-process=style/watermark',
    tag: '会员专享',
    tagType: 'member',
    title: '月卡会员充电9折',
    desc: '购买月卡会员，每月享受30次9折充电优惠',
    time: '长期有效',
    status: 'active',
    usageCount: 3456,
    usageRate: 92
  },
  {
    id: '4',
    image: 'https://aimg8.dlssyht.cn/u/1810712/ueditor/image/906/1810712/1672372872136105.jpg',
    tag: '节日活动',
    tagType: 'holiday',
    title: '国庆充电满10元减5元',
    desc: '国庆期间充电满10元即可享受5元立减，每人限3次',
    time: '2023-10-01 至 2023-10-07',
    status: 'active',
    usageCount: 892,
    usageRate: 65
  }
])

// 切换分类
const switchCategory = (category: string) => {
  currentCategory.value = category
  // 这里可以添加分类筛选逻辑
}

// 搜索活动
const handleSearch = (e: any) => {
  const keyword = e.detail.value
  // 这里可以添加搜索逻辑
}

// 跳转到活动详情
const goToPromotionDetail = (id: string) => {
  // @ts-ignore
  uni.navigateTo({
    url: `/pages/promotion/detail?id=${id}`
  })
}

// 页面加载
onMounted(() => {
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '优惠活动'
  })
})
</script>

<style lang="scss" scoped>
/* 导入变量和混合宏 */
@import '@/styles/variables.scss';

.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}

/* 搜索区域 */
.search-section {
  padding: 20rpx 30rpx;
  background-color: $white;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 99;
  
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
}

/* 分类区域 */
.category-section {
  background-color: $white;
  padding: 20rpx 0;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  
  .category-scroll {
    white-space: nowrap;
    
    .category-list {
      display: inline-block;
      padding: 0 30rpx;
      
      .category-item {
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

/* 活动列表 */
.promotion-list {
  padding: 0 30rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  
  .promotion-item {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    border: 1rpx solid $border-color-light;
    transition: all 0.3s ease;
    
    &:active {
      transform: translateY(2rpx);
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
    }
    
    .promo-image {
      width: 100%;
      height: 240rpx;
      background-color: #e8ecf2;
    }
    
    .promo-info {
      padding: 32rpx;
      
      .promo-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        
        .promo-tag {
          font-size: 24rpx;
          font-weight: 600;
          padding: 8rpx 20rpx;
          border-radius: 16rpx;
          
          &.tag-new {
            color: $success-color;
            background-color: rgba(25, 190, 107, 0.15);
          }
          
          &.tag-member {
            color: $primary-color;
            background-color: rgba(0, 132, 255, 0.15);
          }
          
          &.tag-limited {
            color: $warning-color;
            background-color: rgba(255, 153, 0, 0.15);
          }
          
          &.tag-holiday {
            color: $error-color;
            background-color: rgba(237, 63, 20, 0.15);
          }
        }
        
        .promo-time {
          font-size: 22rpx;
          color: $text-color-tertiary;
        }
      }
      
      .promo-title {
        font-size: 32rpx;
        font-weight: 600;
        color: $text-color;
        margin-bottom: 16rpx;
        line-height: 1.3;
      }
      
      .promo-desc {
        font-size: 26rpx;
        color: $text-color-secondary;
        margin-bottom: 24rpx;
        line-height: 1.5;
      }
      
      .promo-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .promo-usage {
          display: flex;
          gap: 20rpx;
          
          .usage-count,
          .usage-rate {
            font-size: 24rpx;
            color: $text-color-tertiary;
          }
        }
        
        .promo-action {
          .action-btn {
            min-width: 140rpx;
            height: 60rpx;
            background: linear-gradient(135deg, $primary-color, #3399ff);
            color: $white;
            font-size: 26rpx;
            font-weight: 500;
            border-radius: 30rpx;
            border: none;
            box-shadow: 0 6rpx 18rpx rgba(0, 132, 255, 0.35);
            transition: all 0.3s ease;
            
            &:active {
              transform: scale(0.95);
              box-shadow: 0 3rpx 9rpx rgba(0, 132, 255, 0.25);
            }
            
            &:disabled {
              background: linear-gradient(135deg, $gray-3, $gray-4);
              color: $gray-6;
              box-shadow: none;
            }
          }
        }
      }
    }
  }
}

/* 空状态 */
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