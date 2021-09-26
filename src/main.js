import Vue from 'vue'
import App from './App.vue'
// import router from './router';
import { createRouter } from './router'
// import store from './store'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

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