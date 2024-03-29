/**
 * @file NuxtConfig / Commonjs moduile
 * @lastModifiedTime 2019-10-26 00:12:57
 * @author KaiKaio <https://github.com/KaiKaio>
*/

import appConfig from './config/app.config'
import apiConfig from './config/api.config'

export default {
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
    publicPath: 'https://cdn.kaikaio.com/_nuxt/',
    babel:{
      plugins:[
        ["@babel/plugin-proposal-private-methods", { "loose": true }]
      ]
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
