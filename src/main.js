import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import jQuery from 'jquery'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

import '@/assets/css/layout.css'
import '@/assets/css/skin.css'
import '@/assets/css/custom.css'
import '@/assets/css/print.css'

Vue.config.productionTip = false

Vue.prototype.$useExternalApi = process.env.VUE_APP_EXTERNAL_API
Vue.prototype.$homeUrl = process.env.VUE_APP_URL_HOME
Vue.prototype.$dataUrlCustomerRead = process.env.VUE_APP_URL_DATA_CUSTOMER_READ

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

global.jQuery = jQuery
global.$ = jQuery

import { store } from './store/store'
import routes from './routes/routes'

const router = new VueRouter({
  base: process.env.VUE_APP_URL_ROOT,
  mode: process.env.VUE_APP_URL_ROUTE_MODE,
  hash: /^true$/i.test(process.env.VUE_APP_URL_ROUTE_HASH),
  linkActiveClass: "active",
  routes
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
