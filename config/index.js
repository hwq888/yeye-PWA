'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/loan/hzed/loan-api': {
      //   // target: 'http://10.10.30.133:8090', // 开发环境
      //   // target: 'http://10.10.30.151:8090', // 测试环境
      //   target: 'http://xinanhyj.hzed.com', // 测试环境(新安)
      //   // target: 'http://xinancl.hzed.com', // 测试环境(新安存量)
      //   // target: 'https://haoyijie.hzed.com/loan', // 预生产环境
      //   // target: 'http://10.10.20.192:8090', // 温华平
      //   // target: 'http://10.10.20.183:8090', // 卢晓辉
      //   // target: 'http://10.8.0.6:8090', // 尹旭军
      //   // target: 'http://10.10.20.185:8090', // 桂畅
      //   // target: 'http://10.10.20.193:8090', // 冼锦怡
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/loan/hzed/loan-api': '/loan/hzed/loan-api'
      //   }
      // }
    },
    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
