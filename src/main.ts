import { createSSRApp } from "vue";
import App from "./App.vue";
import { store } from './stores'
import './uni.scss' // 引入全局样式

// 导入order工具函数，确保构建时生成order.js文件
import * as OrderUtils from './utils/order'
console.log(OrderUtils) // 避免被Tree Shaking移除

export function createApp() {
  const app = createSSRApp(App);
  
  // 使用Pinia状态管理
  app.use(store);
  
  return {
    app,
  };
}