export default defineNuxtConfig({
  compatibilityDate: '2024-04-15',
  devtools: { enabled: true },
  
  future: {
    compatibilityVersion: 4
  },

  runtimeConfig: {
    // apiBaseUrl: 'https://api.kaikaio.com/api',
    apiBaseUrl: 'http://10.242.46.156:4000/api',
    public: {
      // baseUrl: 'https://api.kaikaio.com/api'
      baseUrl: 'http://10.242.46.156:4000/api',
    }
  },

  app: {
    pageTransition: { name: 'transitionRouter', mode: 'out-in' },
    head: {
      title: 'KaiKaio',
      titleTemplate: '%s | KaiKaio',
      meta: [
        { name: 'author', content: 'KaiKai' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
        { name: 'keywords', content: 'KaiKai,React,Vue,前端开发,JavaScript,Nodejs' },
        { name: 'description', content: '一代人终将老去，但也总有人正年轻' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        { src: '//at.alicdn.com/t/c/font_1477103_ky7qz3xfuv.js' }
      ]
    }
  },

  css: ['~/assets/styles/app.scss'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/init.scss" as *;',
          silenceDeprecations: [
            'import',
            'legacy-js-api',
            'global-builtin',
            'if-function',
            'slash-div',
            'color-functions'
          ]
        }
      }
    },
    optimizeDeps: {
      include: [
        'js-base64',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'marked',
        'highlight.js',
        'ua-parser-js',
      ]
    }
  }
})
