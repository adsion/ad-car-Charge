<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="登录" :show-back="false" />
    
    <!-- 登录表单 -->
    <view class="login-form-section">
      <view class="form-title">电动车充电</view>
      <view class="form-desc">欢迎使用电动车充电服务</view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="iconfont icon-phone"></text>
          <input 
            class="form-input" 
            type="number" 
            placeholder="请输入手机号" 
            v-model="loginForm.phone"
            maxlength="11"
          />
        </view>
      </view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="iconfont icon-password"></text>
          <input 
            class="form-input" 
            type="password" 
            placeholder="请输入密码" 
            v-model="loginForm.password"
          />
        </view>
      </view>
      
      <view class="form-item">
        <button 
          class="login-btn" 
          :disabled="isLoggingIn"
          @click="handleLogin"
        >
          {{ isLoggingIn ? '登录中...' : '登录' }}
        </button>
      </view>
      
      <view class="form-links">
        <text class="link-text" @click="goToRegister">注册新账户</text>
        <text class="link-text" @click="goToResetPassword">忘记密码</text>
      </view>
    </view>
    
    <!-- 第三方登录 -->
    <view class="third-party-section">
      <view class="divider">
        <view class="divider-line"></view>
        <view class="divider-text">第三方登录</view>
        <view class="divider-line"></view>
      </view>
      
      <view class="third-party-list">
        <view class="third-party-item" @click="loginWithWechat">
          <view class="item-icon bg-green">
            <text class="iconfont icon-wechat"></text>
          </view>
          <view class="item-text">微信登录</view>
        </view>
        <view class="third-party-item" @click="loginWithAlipay">
          <view class="item-icon bg-blue">
            <text class="iconfont icon-alipay"></text>
          </view>
          <view class="item-text">支付宝登录</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'
import { useUserStore } from '@/stores/user'

interface LoginForm {
  phone: string
  password: string
}

const userStore = useUserStore()
const isLoggingIn = ref(false)

const loginForm = ref<LoginForm>({
  phone: '',
  password: ''
})

// 处理登录
const handleLogin = async () => {
  if (!loginForm.value.phone || !loginForm.value.password) {
    // @ts-ignore
    uni.showToast({
      title: '请输入手机号和密码',
      icon: 'none'
    })
    return
  }
  
  if (loginForm.value.phone.length !== 11) {
    // @ts-ignore
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }
  
  isLoggingIn.value = true
  
  try {
    // @ts-ignore
    const result: any = await userStore.login(loginForm.value.phone, loginForm.value.password)
    
    if (result.success) {
      // @ts-ignore
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      // 跳转到首页
      setTimeout(() => {
        // @ts-ignore
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 1500)
    } else {
      // @ts-ignore
      uni.showToast({
        title: result.message || '登录失败',
        icon: 'none'
      })
    }
  } catch (error) {
    // @ts-ignore
    uni.showToast({
      title: '登录异常',
      icon: 'none'
    })
  } finally {
    isLoggingIn.value = false
  }
}

// 跳转到注册页面
const goToRegister = () => {
  // @ts-ignore
  uni.showToast({
    title: '注册功能开发中',
    icon: 'none'
  })
}

// 跳转到重置密码页面
const goToResetPassword = () => {
  // @ts-ignore
  uni.showToast({
    title: '重置密码功能开发中',
    icon: 'none'
  })
}

// 微信登录
const loginWithWechat = () => {
  // @ts-ignore
  uni.showToast({
    title: '微信登录功能开发中',
    icon: 'none'
  })
}

// 支付宝登录
const loginWithAlipay = () => {
  // @ts-ignore
  uni.showToast({
    title: '支付宝登录功能开发中',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 30rpx;
}

.login-form-section {
  padding: 60rpx 30rpx;
  
  .form-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $text-color;
    text-align: center;
    margin-bottom: 20rpx;
  }
  
  .form-desc {
    font-size: $font-size-md;
    color: $text-color-secondary;
    text-align: center;
    margin-bottom: 60rpx;
  }
  
  .form-item {
    margin-bottom: 30rpx;
    
    .input-wrapper {
      display: flex;
      align-items: center;
      height: 80rpx;
      background-color: $white;
      border-radius: $border-radius-md;
      padding: 0 30rpx;
      
      .iconfont {
        font-size: 36rpx;
        color: $text-color-secondary;
        margin-right: 20rpx;
      }
      
      .form-input {
        flex: 1;
        font-size: $font-size-md;
        color: $text-color;
        background: transparent;
      }
    }
    
    .login-btn {
      width: 100%;
      height: 80rpx;
      background-color: $primary-color;
      color: $white;
      font-size: $font-size-md;
      border-radius: $border-radius-md;
      
      &:disabled {
        background-color: $gray-3;
        color: $gray-6;
      }
    }
  }
  
  .form-links {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    
    .link-text {
      font-size: $font-size-sm;
      color: $primary-color;
    }
  }
}

.third-party-section {
  padding: 0 30rpx;
  
  .divider {
    display: flex;
    align-items: center;
    margin: 60rpx 0;
    
    .divider-line {
      flex: 1;
      height: 1rpx;
      background-color: $border-color;
    }
    
    .divider-text {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      padding: 0 30rpx;
    }
  }
  
  .third-party-list {
    display: flex;
    justify-content: center;
    
    .third-party-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 40rpx;
      
      .item-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
        
        .iconfont {
          font-size: 40rpx;
          color: $white;
        }
        
        &.bg-green {
          background-color: $success-color;
        }
        
        &.bg-blue {
          background-color: $primary-color;
        }
      }
      
      .item-text {
        font-size: $font-size-sm;
        color: $text-color;
      }
    }
  }
}
</style>