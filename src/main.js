import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './element'
import '@/icons' // icon
import '@/permission'
import 'hb-js-utils'
import VHBTable from 'vhb-table'
import 'vhb-table/lib/style.css'
Vue.use(VHBTable)
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
