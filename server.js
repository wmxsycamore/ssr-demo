const vue = require('vue')
const express = require('express');
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

const serverBundle = require(path.resolve(process.cwd(), 'serverDist', 'vue-ssr-server-bundle.json'));
const clientManifestPath = path.resolve(process.cwd(), 'dist', 'vue-ssr-client-manifest.json');
const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, 'utf-8'));
// html文件不是模块化的，所有只能fs读取文件的方式读取
const template = fs.readFileSync(path.resolve(__dirname,'index.html'), 'utf-8')
server.use(express.static(path.resolve(process.cwd(), 'dist')));
// renderer:生成vue实例
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  clientManifest: clientManifest,
  template:template
});
// const {  } = require('./main')
// * 代表用户只要访问1000的这个服务，无论请求哪个地址都会执行这个方法。
server.get('*', (req, res) => {
  // req 请求体
  // res 响应体
  if(req.url !== '/favicon.icon') {
    // context为传给server-entry的context
    const context = {
      url: req.url,

    }
    renderer.renderToString(context).then((html) => {
      res.end(html)
    })
  }
})
server.listen(1000)
// 每次切换地址都刷新页面，代表每次都是从服务端拉取的。 