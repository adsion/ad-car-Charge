<template>
  <view class="container">
    <!-- 自定义导航栏 -->
    <CustomNavbar title="充电控制" :show-back="false" />
    
    <!-- 充电状态 -->
    <view class="charge-status-section">
      <view class="status-icon">
        <text class="iconfont icon-charging"></text>
      </view>
      <view class="status-text">{{ chargeStatus }}</view>
    </view>
    
    <!-- 充电信息 -->
    <view class="charge-info-section">
      <view class="info-item">
        <view class="item-label">电站名称</view>
        <view class="item-value">XX小区充电站</view>
      </view>
      <view class="info-item">
        <view class="item-label">充电桩</view>
        <view class="item-value">充电桩01</view>
      </view>
      <view class="info-item">
        <view class="item-label">开始时间</view>
        <view class="item-value">{{ startTime }}</view>
      </view>
    </view>
    
    <!-- 充电参数 -->
    <view class="charge-param-section">
      <view class="param-item">
        <view class="item-label">已充电量</view>
        <view class="item-value">{{ chargePower }}度</view>
      </view>
      <view class="param-item">
        <view class="item-label">已用时长</view>
        <view class="item-value">{{ chargeTime }}</view>
      </view>
      <view class="param-item">
        <view class="item-label">预计费用</view>
        <view class="item-value">¥{{ chargeFee }}</view>
      </view>
    </view>
    
    <!-- 控制按钮 -->
    <view class="control-section">
      <button 
        class="control-btn stop-btn" 
        @click="stopCharging"
        :disabled="isCharging === false"
      >
        结束充电
      </button>
    </view>
    
    <!-- 充电曲线图 -->
    <view class="chart-section">
      <view class="section-title">充电功率曲线</view>
      <view class="chart-container">
        <canvas 
          type="2d" 
          class="power-chart" 
          id="powerChart" 
          :canvas-id="'powerChart'"
        ></canvas>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import CustomNavbar from '@/components/CustomNavbar.vue'

// 充电状态
const chargeStatus = ref('正在充电')
const isCharging = ref(true)
const startTime = ref('2023-10-12 14:30')
const chargePower = ref('12.5')
const chargeTime = ref('01:25:30')
const chargeFee = ref('8.60')

// 充电曲线数据
const powerData = ref<number[]>([])

let timer: number | null = null
let chartTimer: number | null = null
let canvasContext: any = null
let canvasInstance: any = null

// 生成随机功率数据
const generateRandomPower = () => {
  // 模拟充电功率，范围在1kW到6kW之间
  return Math.random() * 5 + 1
}

// 初始化功率数据
const initPowerData = () => {
  // 初始生成10个数据点
  powerData.value = Array.from({ length: 10 }, () => generateRandomPower())
}

// 更新充电曲线数据
const updateChartData = () => {
  // 每次添加一个新数据点
  powerData.value.push(generateRandomPower())
  // 保持数据点数量不超过20个
  if (powerData.value.length > 20) {
    powerData.value.shift()
  }
  // 重新绘制曲线
  drawPowerChart()
}

// 初始化Canvas
const initCanvas = async () => {
  // @ts-ignore
  const query = uni.createSelectorQuery()
  query.select('#powerChart')
    .fields({ node: true, size: true })
    .exec(async (res: any) => {
      const canvas = res[0].node
      canvas.width = res[0].width
      canvas.height = res[0].height
      canvasContext = canvas.getContext('2d')
      canvasInstance = canvas
      
      // 绘制初始曲线
      drawPowerChart()
    })
}

// 绘制充电功率曲线
const drawPowerChart = () => {
  if (!canvasContext || !canvasInstance) return
  
  const width = canvasInstance.width
  const height = canvasInstance.height
  
  // 清空画布
  canvasContext.clearRect(0, 0, width, height)
  
  // 绘制整个图表
  drawChart()
}

// 绘制完整图表
const drawChart = () => {
  if (!canvasContext || !canvasInstance) return
  
  const width = canvasInstance.width
  const height = canvasInstance.height
  const padding = 40 // 增加内边距，为坐标轴标签留出空间
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  
  // 绘制网格背景
  drawGrid(width, height, padding, chartWidth, chartHeight)
  
  // 绘制坐标轴
  drawAxes(width, height, padding, chartWidth, chartHeight)
  
  // 绘制曲线
  drawCurve(chartWidth, chartHeight, padding)
  
  // 绘制当前功率点
  drawCurrentPoint(chartWidth, chartHeight, padding)
}

// 绘制网格背景
const drawGrid = (width: number, height: number, padding: number, chartWidth: number, chartHeight: number) => {
  canvasContext.strokeStyle = 'rgba(0, 0, 0, 0.05)'
  canvasContext.lineWidth = 1
  
  // 垂直线
  for (let i = 0; i <= 4; i++) {
    const x = padding + (i / 4) * chartWidth
    canvasContext.beginPath()
    canvasContext.moveTo(x, padding)
    canvasContext.lineTo(x, height - padding)
    canvasContext.stroke()
  }
  
  // 水平线
  for (let i = 0; i <= 4; i++) {
    const y = padding + (i / 4) * chartHeight
    canvasContext.beginPath()
    canvasContext.moveTo(padding, y)
    canvasContext.lineTo(width - padding, y)
    canvasContext.stroke()
  }
}

// 绘制坐标轴
const drawAxes = (width: number, height: number, padding: number, chartWidth: number, chartHeight: number) => {
  // 绘制Y轴标签
  canvasContext.fillStyle = '#666666'
  canvasContext.font = '12px Arial'
  canvasContext.textAlign = 'right'
  
  const yLabels = ['6kW', '4kW', '2kW', '0kW']
  yLabels.forEach((label, index) => {
    const y = padding + (index / 3) * chartHeight
    canvasContext.fillText(label, padding - 10, y + 5)
  })
  
  // 绘制X轴标签
  canvasContext.textAlign = 'center'
  const xLabels = ['0h', '20min', '40min', '60min']
  xLabels.forEach((label, index) => {
    const x = padding + (index / 3) * chartWidth
    canvasContext.fillText(label, x, height - padding + 20)
  })
}

// 绘制曲线
const drawCurve = (chartWidth: number, chartHeight: number, padding: number) => {
  if (powerData.value.length < 2) return
  
  const pointSpacing = chartWidth / (powerData.value.length - 1)
  
  // 绘制曲线下方填充
  canvasContext.beginPath()
  canvasContext.moveTo(padding, padding + chartHeight - (powerData.value[0] / 6) * chartHeight)
  
  for (let i = 1; i < powerData.value.length; i++) {
    const x = padding + i * pointSpacing
    const y = padding + chartHeight - (powerData.value[i] / 6) * chartHeight
    
    // 使用直线连接，简化绘制逻辑
    canvasContext.lineTo(x, y)
  }
  
  // 连接到底部形成填充区域
  canvasContext.lineTo(padding + chartWidth, padding + chartHeight)
  canvasContext.lineTo(padding, padding + chartHeight)
  canvasContext.closePath()
  
  // 填充渐变
  const gradient = canvasContext.createLinearGradient(padding, padding, padding + chartWidth, padding)
  gradient.addColorStop(0, 'rgba(0, 132, 255, 0.2)')
  gradient.addColorStop(1, 'rgba(25, 190, 107, 0.2)')
  canvasContext.fillStyle = gradient
  canvasContext.fill()
  
  // 绘制曲线
  canvasContext.beginPath()
  canvasContext.moveTo(padding, padding + chartHeight - (powerData.value[0] / 6) * chartHeight)
  
  for (let i = 1; i < powerData.value.length; i++) {
    const x = padding + i * pointSpacing
    const y = padding + chartHeight - (powerData.value[i] / 6) * chartHeight
    
    // 使用直线连接，简化绘制逻辑
    canvasContext.lineTo(x, y)
  }
  
  // 设置曲线样式
  canvasContext.strokeStyle = '#0084ff'
  canvasContext.lineWidth = 3
  canvasContext.lineCap = 'round'
  canvasContext.lineJoin = 'round'
  canvasContext.stroke()
}

// 绘制当前功率点
const drawCurrentPoint = (chartWidth: number, chartHeight: number, padding: number) => {
  if (powerData.value.length === 0) return
  
  const pointSpacing = chartWidth / (powerData.value.length - 1 || 1)
  const lastIndex = powerData.value.length - 1
  const x = padding + lastIndex * pointSpacing
  const y = padding + chartHeight - (powerData.value[lastIndex] / 6) * chartHeight
  const currentPower = powerData.value[lastIndex].toFixed(1)
  
  // 绘制外圈
  canvasContext.beginPath()
  canvasContext.arc(x, y, 6, 0, Math.PI * 2)
  canvasContext.fillStyle = '#0084ff'
  canvasContext.fill()
  
  // 绘制内圈
  canvasContext.beginPath()
  canvasContext.arc(x, y, 3, 0, Math.PI * 2)
  canvasContext.fillStyle = '#ffffff'
  canvasContext.fill()
  
  // 绘制功率值
  canvasContext.font = '14px Arial'
  canvasContext.fillStyle = '#0084ff'
  canvasContext.textAlign = 'center'
  canvasContext.fillText(`${currentPower}kW`, x, y - 10)
}

// 结束充电
const stopCharging = () => {
  // @ts-ignore
  uni.showModal({
    title: '确认结束',
    content: '确定要结束本次充电吗？',
    success: function (res) {
      if (res.confirm) {
        isCharging.value = false
        chargeStatus.value = '充电结束'
        
        if (timer) {
          clearInterval(timer)
          timer = null
        }
        
        if (chartTimer) {
          clearInterval(chartTimer)
          chartTimer = null
        }
        
        // @ts-ignore
        uni.showToast({
          title: '已结束充电',
          icon: 'success'
        })
        
        // 跳转到充电状态页面
        setTimeout(() => {
          // @ts-ignore
          uni.redirectTo({
            url: '/pages/charge/status'
          })
        }, 1500)
      }
    }
  })
}

// 模拟充电数据更新
const updateChargeData = () => {
  // 这里可以添加实际的充电数据更新逻辑
  console.log('更新充电数据...')
}

// 监听数据变化，重新绘制曲线
watch(powerData, () => {
  drawPowerChart()
}, { deep: true })

// 页面加载时启动定时器
onMounted(() => {
  // @ts-ignore
  uni.setNavigationBarTitle({
    title: '充电控制'
  })
  
  // 初始化充电曲线数据
  initPowerData()
  
  // 初始化Canvas
  setTimeout(() => {
    initCanvas()
  }, 100)
  
  // 启动定时器模拟数据更新
  timer = setInterval(() => {
    updateChargeData()
  }, 5000) as any
  
  // 启动定时器更新充电曲线
  chartTimer = setInterval(() => {
    updateChartData()
  }, 3000) as any
})

// 页面卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  if (chartTimer) {
    clearInterval(chartTimer)
    chartTimer = null
  }
})
</script>

<style lang="scss" scoped>
.container {
  background-color: $background-color;
  min-height: 100vh;
  padding-bottom: 30rpx;
  box-sizing: border-box;
}

/* 充电状态优化 */
.charge-status-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border-radius: 0 0 24rpx 24rpx;
  
  .status-icon {
    width: 140rpx;
    height: 140rpx;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(25, 190, 107, 0.15), rgba(0, 132, 255, 0.15));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30rpx;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
    animation: pulse 2s infinite;
    
    .icon-charging {
      font-size: 72rpx;
      color: $success-color;
    }
  }
  
  .status-text {
    font-size: 36rpx;
    font-weight: 600;
    color: $text-color;
    text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  }
}

/* 充电信息优化 */
.charge-info-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 32rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    .item-label {
      font-size: 28rpx;
      color: $text-color-secondary;
      font-weight: 500;
    }
    
    .item-value {
      font-size: 28rpx;
      color: $text-color;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 300rpx;
      text-align: right;
    }
  }
}

/* 充电参数优化 */
.charge-param-section {
  display: flex;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 32rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .param-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20rpx;
    
    &:not(:last-child) {
      border-right: 1rpx solid rgba(0, 0, 0, 0.06);
    }
    
    .item-label {
      font-size: 26rpx;
      color: $text-color-tertiary;
      margin-bottom: 16rpx;
      font-weight: 500;
    }
    
    .item-value {
      font-size: 36rpx;
      font-weight: 700;
      color: $primary-color;
      text-shadow: 0 2rpx 4rpx rgba(0, 132, 255, 0.2);
    }
  }
}

/* 控制按钮优化 */
.control-section {
  padding: 0 30rpx 20rpx;
  
  .control-btn {
    width: 100%;
    height: 90rpx;
    font-size: 32rpx;
    font-weight: 600;
    border-radius: 45rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 30rpx;
    box-sizing: border-box;
    border: none;
    transition: all 0.3s ease;
    
    &.stop-btn {
      background: linear-gradient(135deg, $error-color, #ff6666);
      color: $white;
      box-shadow: 0 8rpx 24rpx rgba(237, 63, 20, 0.35);
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 12rpx rgba(237, 63, 20, 0.25);
    }
    
    &:disabled {
      background-color: $gray-3;
      color: $gray-6;
      box-shadow: none;
      transform: none;
    }
  }
}

/* 充电曲线图优化 */
.chart-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 32rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid $border-color-light;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: $text-color;
    margin-bottom: 30rpx;
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
  
  .chart-container {
    height: 320rpx;
    background-color: rgba(0, 0, 0, 0.04);
    border-radius: 12rpx;
    overflow: hidden;
  }
  
  .chart-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20rpx;
    box-sizing: border-box;
  }
  
  .y-axis {
    position: absolute;
    left: 20rpx;
    top: 20rpx;
    height: calc(100% - 40rpx);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    padding-right: 10rpx;
  }
  
  .x-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 10rpx;
    padding: 0 20rpx;
  }
  
  .axis-label {
    font-size: 20rpx;
    color: #666;
  }
  
  .chart-main {
    flex: 1;
    position: relative;
    overflow: hidden;
  }
  
  .power-chart {
    width: 100%;
    height: 100%;
  }
}

/* 动画效果 */
@keyframes pulse {
  0% {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 12rpx 36rpx rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }
}
</style>