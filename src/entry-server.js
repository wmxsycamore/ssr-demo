import { createApp } from './main'
// context:地址 context = req.url  {url: /page1}
// 每次访问时都会执行context => {}这个方法
export default context => {
  // promise
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 让router-view里的内容变成page1的内容
    // 为什么每次都要创建新实例。路由的当前状态只能是一个，不同的人访问不同的路由时，如果只有一个实例，router-view里不知道要显示哪个页面。
    router.push(context.url)
    // 跳转完成，将实例返回
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
        context.state = store.state

        resolve(app)
      }).catch(reject)
    }, reject)
  })
}