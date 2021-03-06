/**
 * @file Api config / ES module
 * @lastModifiedTime 2019-10-29 15:08:37
 * @author KaiKaio <https://github.com/KaiKaio>
*/
import { NODE_ENV } from '../environment'

const apiConfig = {
  // proxyUrl: '/proxy/',
  development: {
    baseUrl: 'http://localhost:4000/api',
  },
  production: {
    baseUrl: 'https://api.kaikaio.com/api',
  }
}

export default apiConfig[NODE_ENV]
