const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
    css: {
        // 不提取 CSS
        extract: false
    },
    outputDir: 'serverDist',
    configureWebpack: () => ({
        // 服务器入口文件
        entry: `./src/server-entry.js`,
        devtool: 'source-map',
        // 构建目标为nodejs环境
        target: 'node', // 运行在node端，所以指定打包目标（webpack,不写默认以浏览器标准）
        output: {
            filename: 'server-bundle.js',
            // 构建目标加载模式 commonjs
            libraryTarget: 'commonjs2',
        },
        // 跳过 node_mdoules，运行时会自动加载，不需要编译
        externals: nodeExternals({
            // 允许css文件，方便css module
            allowlist: [/\.css$/]
        }),
        // 关闭代码切割
        optimization: {
            splitChunks: false
        },
        plugins: [
            new VueSSRServerPlugin()
        ]
    })
}
