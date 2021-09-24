const path = require('path')
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-plus/dist/index.css',
      'https://unpkg.com/normalize.css@8.0.1/normalize.css'
    ],
    js: [
      'https://unpkg.com/vue@next',
      'https://unpkg.com/vue-router@next',
      'https://unpkg.com/vuex@next',
      'https://unpkg.com/axios@0.21.4/dist/axios.min.js',
      'https://unpkg.com/element-plus@1.1.0-beta.9/dist/index.full.js',
      'https://unpkg.com/dayjs',
      'https://unpkg.com/echarts@5.2.1/dist/echarts.js'
    ]
  }
}
module.exports = {
  // 1.配置方式一: CLI提供的属性
  // outputDir: './build',
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:5000/',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  },
  productionSourceMap: false, //打包之后不生成map文件
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 打包时候不会引入
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-plus': 'ELEMENT-PLUS',
        echarts: 'echarts',
        dayjs: 'dayjs'
      }
    }
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
      components: '@/components'
    }
  },
  chainWebpack: (config) => {
    config.optimization.minimize(true) //进行代码压缩
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
      // 生产环境注入cdn
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn.build
        return args
      })
    }
  }
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
