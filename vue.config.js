// const proxy = require('http-proxy-middleware');

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
//本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
      // vue: 'Vue',
      // vuex: 'Vuex',
      // 'vue-router': 'VueRouter',
      // 'element-ui':'ELEMENT'
    },
    // cdn的css链接
    css: [
      // 'https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css'
    ],
    // cdn的js链接
    js: [
      // 'https://unpkg.com/vue@2.6.11/dist/vue.js',
      // 'https://unpkg.com/vuex@3.1.3/dist/vuex.min.js',
      // 'https://unpkg.com/vue-router@3.1.6/dist/vue-router.min.js',
      // 'https://unpkg.com/element-ui@2.13.0/lib/index.js'
    ]
}

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: process.env.BACKEND,
        changeOrigin: true
      },
      '/admin': {
        target: process.env.BACKEND,
        changeOrigin: true
      },
      '/media': {
        target: process.env.BACKEND,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    // ============压缩图片 start============
    // config.module
    //     .rule('images')
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({ bypassOnDebug: true })
    //     .end()
    // ============压缩图片 end============
    // ============注入cdn start============
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction || devNeedCdn) args[0].cdn = cdn
        return args
    })
  },
  configureWebpack: config => {
    // 用cdn方式引入，则构建时要忽略相关资源
    if (isProduction || devNeedCdn) config.externals = cdn.externals
    const productionGzipExtensions = ['html', 'js', 'css']
    if(isProduction){
    config.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + productionGzipExtensions.join('|') + ')$'
            ),
            threshold: 102400, // 只有大小大于该值的资源会被处理 100K
            minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
            deleteOriginalAssets: false // 删除原文件
        })
    )
    config.plugins.push(
       new UglifyJsPlugin({
           uglifyOptions: {
               //生产环境自动删除console
               compress: {
                   // warnings: false, // 若打包错误，则注释这行
                   drop_debugger: true,
                   drop_console: true,
                   pure_funcs: ['console.log']
               }
           },
           sourceMap: false,
           parallel: true
       })
     )
    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }
  }
}
