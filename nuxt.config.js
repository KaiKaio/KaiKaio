/**
 * @file NuxtConfig / CommonJS module
 * @lastModifiedTime 2019-10-26 00:12:57
 * @author KaiKaio <https://github.com/KaiKaio>
*/

const appConfig = require('./config/app.config')
const apiConfig = require('./config/api.config')

module.exports = {
  mode: 'universal',
  modern: true,
  env: {
    baseUrl: apiConfig.baseUrl,
  },

  loading: { color: appConfig.color.primary },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },

  head: {
    title: `${appConfig.meta.title}`,
    titleTemplate: `%s | ${appConfig.meta.title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'author', content: appConfig.meta.email },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: appConfig.meta.keywords },
      { hid: 'description', name: 'description', content: appConfig.meta.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1477103_4wpie1qyj3u.js' }
    ],
  },

  icon: {
    iconSrc: '/static/icon.png',
    sizes: [16, 120, 144, 152]
  },

  plugins: [
    { src: '@/plugins/vue-extend' },
  ],

  buildModules: [
  ],

  modules: [
    '@nuxtjs/style-resources',
    ['@nuxtjs/axios', { baseURL: apiConfig.baseUrl, timeout: 8000 } ]
  ],

  build: {
    publicPath: process.env.NODE_ENV === 'production' 
      ? 'https://cdn.kaikaio.com/_nuxt/' 
      : '/_nuxt/',
    babel:{
      plugins:[
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
      ]
    },
    loaders: {
      scss: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import', 'slash-div', 'global-builtin', 'color-functions', 'if-function']
        }
      }
    }
  },

  css: [
    '@/assets/styles/app.scss'
  ],

  styleResources: {
    scss: [
      './assets/styles/init.scss'
    ]
  },
}
