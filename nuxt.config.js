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

  head: {
    title: `${appConfig.meta.title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '//at.alicdn.com/t/font_1477103_28x39s93ft5h.js' },
    ],
  },

  loading: { color: appConfig.color.primary },

  css: [
    'normalize.css/normalize.css',
    '@/assets/styles/app.scss',
  ],

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
