/**
 * @file NuxtConfig / Commonjs moduile
 * @lastModifiedTime 2019-10-26 00:12:57
 * @author KaiKaio <https://github.com/KaiKaio>
*/

// import appConfig from './config/app.config'
const appConfig = require('./config/app.config')

// export default {
module.exports = {
  mode: 'universal',

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
      { src: '//at.alicdn.com/t/font_1477103_tlqwq4hpg2.js' },
    ],
  },

  loading: { color: '#fff' },

  css: [
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css/normalize.css',
    '@/assets/styles/app.scss',
  ],

  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vue-extend' },
  ],

  buildModules: [
  ],

  modules: [
  ],

  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
    }
  }
}
