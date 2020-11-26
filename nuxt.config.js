/**
 * @file NuxtConfig / Commonjs moduile
 * @lastModifiedTime 2019-10-26 00:12:57
 * @author KaiKaio <https://github.com/KaiKaio>
*/

import appConfig from './config/app.config'
import apiConfig from './config/api.config'

export default {
  mode: 'universal',
  // modern: true,
  env: {
    baseUrl: apiConfig.baseUrl,
  },

  router:{
    base:"http://cdn.kaikaio.com/" //此为根目录，如果有具体目录需求按实际情况写
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
      { src: '//at.alicdn.com/t/font_1477103_3rfixwekkfh.js' }
    ],
  },

  css: [
    'normalize.css/normalize.css',
    '@/assets/styles/app.scss',
  ],

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
    ['@nuxtjs/axios', { baseURL: apiConfig.baseUrl, timeout: 8000 } ]
  ],

  build: {
    extend (config, ctx) {
    }
  }
}
