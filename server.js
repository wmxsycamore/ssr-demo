const vue = require('vue')
const express = require('express');
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')

// 第一步
// process.cwd() 获取当前文件夹路径
const serverBundle = require(path.resolve(process.cwd(), 'serverDist', 'vue-ssr-server-bundle.json'));
const clientManifestPath = path.resolve(process.cwd(), 'dist', 'vue-ssr-client-manifest.json');
const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, 'utf-8'));
// html文件不是模块化的，所有只能fs读取文件的方式读取
const template = fs.readFileSync(path.resolve(__dirname,'index.html'), 'utf-8')

server.use(express.static(path.resolve(process.cwd(), 'dist')));
// 第二步
// renderer:生成vue实例
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  clientManifest: clientManifest,
  template:template
});

server.get('*', (req, res) => {
  // req 请求体
  // res 响应体
  if(req.url !== '/favicon.icon') {
    // context为传给server-entry的context
    const context = {
      url: req.url,
    }
    // 第三步
    renderer.renderToString(context).then(html => {
      // End the response process.
      res.end(html)
    }).catch(err => {
      console.log(err)
      res.status(500).end("Internal Server Error") //equivalent to res.sendStatus(500)
    }) 
  }
})

// 每次刷新页面，都是从服务端拉取的。 
server.listen(1000, () => {
  console.log(`Server running at http://localhost:1000/`);
})
