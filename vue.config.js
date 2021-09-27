const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const serverConfig = require('./webpack.server.config');
const clientConfig = require('./buildConfig/webpack.client.config');

if (TARGET_NODE) {
    module.exports = serverConfig;
} else {
    module.exports = clientConfig;
}