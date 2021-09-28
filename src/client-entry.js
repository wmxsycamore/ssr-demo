import { createApp } from './main'
// 客户端激活，将app里的内容挂到响应的页面上。
// 单页面应用切换地址是在本地切换的，通过下载的js来切换。服务端渲染是在服务端切换的。
// 客户端特定引导逻辑……

const { app, router } = createApp()

// router.onReady，保证路由中的异步引入组件() => import()
router.onReady(() => {
  app.$mount('#app')
})