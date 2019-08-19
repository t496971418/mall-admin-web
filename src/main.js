/*
 * @Author: Terryzh
 * @Date: 2019-08-19 17:23:55
 * @LastEditors: Terryzh
 * @LastEditTime: 2019-08-19 18:49:27
 * @Description: 添加描述
 */
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import { apolloProvider as request } from '@/utils/request'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.$request = request

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
