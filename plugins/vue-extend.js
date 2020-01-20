import Vue from 'vue'

import appConfig from '@/config/app.config'

import SkeletonBox from '~/components/global/skeleton'

Vue.use(SkeletonBox)


Vue.prototype.$appConfig = appConfig;
