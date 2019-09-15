const path = require('path')
const pkg = require('./package')
const webpack = require('webpack')
const api = 'http://127.0.0.1:8080'

module.exports = {
  mode: 'universal',
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    title: '极客学舍',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: 'Kindle电子书,mobi电子书,epub电子书,azw3电子书,电子书永久免费下载,mobi,epub,azw3' },
      { hid: 'description', name: 'description', content: '极客学舍 永久免费的kindle电子书资源下载网站！一起分享阅读的乐趣！' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#09ff02' },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    'ant-design-vue/lib/style/themes/default.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/antd-ui',
      ssr: true
    },
    {
      src: '~/plugins/notification.js',
      ssr: false
    },
    '~/plugins/api'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/router',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    less: []
  },
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: api
    },
    '/favicon.ico': {
      target: api
    },
    '/static': {
      target: api
    },
    '/sitemap.xml': {
      target: api
    }
  },
  /*
  ** Build configuration
  */
  generate: {
    routes: [
    ]
  },
  build: {
    /*
    ** You can extend webpack config here
    */
    analyze: false,
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_': path.resolve(__dirname, './src/lodash.js')
      })
    ],
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    extend (config, ctx) {
    }
  }
}
