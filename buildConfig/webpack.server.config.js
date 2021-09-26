const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(base, {
    target: 'node', // 运行在node端，所以指定打包目标（webpack,不写默认以浏览器标准）
    // devtool: '#source-map',
    entry: './src/server-entry.js',
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2' // 使用commonjs规范
    },
    // resolve: {
    //     alias: {
    //         'create-api': './create-api-server.js'
    //     }
    // },
    // externals: nodeExternals({
    //     whitelist: /\.css$/
    // }),
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        //     'process.env.VUE_ENV': '"server"'
        // }),
        new VueSSRServerPlugin()
    ]
})
