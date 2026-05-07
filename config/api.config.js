/**
 * @file Api config / CommonJS module
 * @lastModifiedTime 2019-10-29 15:08:37
 * @author KaiKaio <https://github.com/KaiKaio>
*/
const { NODE_ENV } = require('../environment')

const apiConfig = {
  development: {
    baseUrl: 'http://10.242.46.156:4000/api',
    // baseUrl: 'http://localhost:4000/api',
    // baseUrl: 'https://api.kaikaio.com/api',
  },
  production: {
    baseUrl: 'https://api.kaikaio.com/api',
  }
}

module.exports = apiConfig[NODE_ENV]
