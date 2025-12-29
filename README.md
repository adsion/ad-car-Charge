# 电动车自助充电系统

基于Vue3 + TypeScript + UniApp开发的商用小区电动车自助充电项目。

## 项目介绍

本项目是一个面向小区用户的电动车自助充电系统，提供电站查找、充电桩控制、订单管理、在线支付等功能。系统支持微信小程序、支付宝小程序、H5等多个平台。

## 项目演示

![输入图片说明](images/%E9%A6%96%E9%A1%B5-1.png)
![输入图片说明](images/%E9%A6%96%E9%A1%B5-2.png)
![输入图片说明](images/%E7%94%B5%E7%AB%99-1.png)
![输入图片说明](images/%E7%94%B5%E7%AB%99-2.png)
![输入图片说明](images/%E7%94%B5%E7%AB%99-3.png)
![输入图片说明](images/%E7%94%B5%E7%AB%99-4.png)
![输入图片说明](images/%E7%94%B5%E7%AB%99-5.png)
![输入图片说明](images/%E8%AE%A2%E5%8D%95-1.png)
![输入图片说明](images/%E8%AE%A2%E5%8D%95-2.png)
![输入图片说明](images/%E8%AE%A2%E5%8D%95-3.png)
![输入图片说明](images/%E8%AE%A2%E5%8D%95-4.png)
![输入图片说明](images/%E6%89%AB%E7%A0%81.png)
![输入图片说明](images/%E6%88%91%E7%9A%84.png)
![输入图片说明](images/%E6%88%91%E7%9A%84-2.png)
![输入图片说明](images/%E6%88%91%E7%9A%84%E9%92%B1%E5%8C%85.png)
![输入图片说明](images/%E4%BC%98%E6%83%A0%E6%B4%BB%E5%8A%A8-1.png)
![输入图片说明](images/%E4%BC%98%E6%83%A0%E6%B4%BB%E5%8A%A8-2.png)

## 功能模块

### 1. 首页模块
- 电站快速查找
- 扫码充电
- 充电状态监控
- 优惠活动展示

### 2. 电站模块
- 附近电站列表
- 电站详情查看
- 充电桩状态展示
- 电站筛选功能

### 3. 充电模块
- 充电控制面板
- 实时充电状态监控
- 充电结束操作

### 4. 订单模块
- 订单列表查看
- 订单详情展示
- 订单状态管理

### 5. 用户模块
- 用户登录/注册
- 个人中心
- 钱包管理
- 充值功能

### 6. 支付模块
- 多种支付方式
- 支付结果处理

## 技术栈

- Vue3 (Composition API)
- TypeScript
- UniApp
- Pinia (状态管理)
- SCSS (样式预处理)

## 项目结构

```
src/
├── components/          # 公共组件
├── pages/               # 页面文件
│   ├── index/           # 首页
│   ├── station/         # 电站相关
│   ├── charge/          # 充电相关
│   ├── order/           # 订单相关
│   ├── user/            # 用户相关
│   └── payment/         # 支付相关
├── stores/              # 状态管理
├── styles/              # 样式文件
├── utils/               # 工具函数
└── static/              # 静态资源
```

## 开发环境

- Node.js >= 16.0.0
- npm >= 8.0.0

## 安装依赖

```bash
npm install
```

## 运行项目

### 运行到H5平台

```bash
npm run dev:h5
```

### 运行到微信小程序

```bash
npm run dev:mp-weixin
```

### 运行到支付宝小程序

```bash
npm run dev:mp-alipay
```

## 构建项目

### 构建H5平台

```bash
npm run build:h5
```

### 构建微信小程序

```bash
npm run build:mp-weixin
```

## 页面路由

| 页面路径 | 页面名称 |
|---------|---------|
| /pages/index/index | 首页 |
| /pages/station/list | 电站列表 |
| /pages/station/detail | 电站详情 |
| /pages/charge/control | 充电控制 |
| /pages/charge/status | 充电状态 |
| /pages/order/list | 订单列表 |
| /pages/order/detail | 订单详情 |
| /pages/user/index | 个人中心 |
| /pages/user/wallet | 我的钱包 |
| /pages/user/recharge | 充值中心 |
| /pages/user/login | 用户登录 |
| /pages/payment/index | 收银台 |

## 注意事项

1. 项目使用了TypeScript，请确保类型定义正确
2. 样式使用SCSS预处理器，请注意变量和混合的使用
3. 图标使用iconfont，请根据实际需求替换图标
4. 支付功能为模拟实现，实际使用时需要集成真实支付SDK

## 项目特点

1. **响应式设计**：适配不同屏幕尺寸
2. **组件化开发**：提高代码复用性
3. **状态管理**：使用Pinia管理应用状态
4. **类型安全**：TypeScript提供类型检查
5. **多端兼容**：支持H5、微信小程序、支付宝小程序等平台

## 后续优化方向

1. 集成真实支付SDK
2. 添加地图定位功能
3. 完善用户权限管理
4. 增加消息推送功能
5. 优化性能和用户体验
6. 后台基于springboot3、elementui-plus

## 联系我

本人是业余时间搞得开源项目，有任何问题都可以加我探讨


![输入图片说明](images/wx.png)
