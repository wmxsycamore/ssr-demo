import Vue from 'vue'
import App from './App.vue'
// import router from './router';
import createRouter from './router'
// import store from './store'
import createStore  from './store'
import { sync } from 'vuex-router-sync'
// 在ssr时，每次访问都会创建一个新的实例
// 非ssr时，只会创建一个跟实例
// createAPP 每次访问创建新实例
Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store}
}