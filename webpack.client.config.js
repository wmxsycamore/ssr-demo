const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = {

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    configureWebpack: () => ({
        entry: `./src/client-entry.js`,
        devtool: 'source-map',
        target: 'web',
        plugins: [
            new VueSSRClientPlugin()
        ]
    }),
    chainWebpack: config => {
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
    }
}
module.exports = config
