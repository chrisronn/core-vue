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

Vue.prototype.$dataUrlUserGet = process.env.VUE_APP_URL_DATA_USER_GET

Vue.prototype.$dataUrlCustomerCreate = process.env.VUE_APP_URL_DATA_CUSTOMER_CREATE
Vue.prototype.$dataUrlCustomerRead = process.env.VUE_APP_URL_DATA_CUSTOMER_READ
Vue.prototype.$dataUrlCustomerReadOne = process.env.VUE_APP_URL_DATA_CUSTOMER_READ_ONE
Vue.prototype.$dataUrlCustomerUpdate = process.env.VUE_APP_URL_DATA_CUSTOMER_UPDATE
Vue.prototype.$dataUrlCustomerDelete = process.env.VUE_APP_URL_DATA_CUSTOMER_DELETE

Vue.prototype.$dataUrlContactKey = process.env.VUE_APP_URL_DATA_CONTACT_URL_CONTACT_KEY
Vue.prototype.$dataUrlContactCreate = process.env.VUE_APP_URL_DATA_CONTACT_CREATE
Vue.prototype.$dataUrlContactRead = process.env.VUE_APP_URL_DATA_CONTACT_READ
Vue.prototype.$dataUrlContactReadOne = process.env.VUE_APP_URL_DATA_CONTACT_READ_ONE
Vue.prototype.$dataUrlContactUpdate = process.env.VUE_APP_URL_DATA_CONTACT_UPDATE
Vue.prototype.$dataUrlContactDelete = process.env.VUE_APP_URL_DATA_CONTACT_DELETE

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

import { ClientTable, Event } from 'vue-tables-2';
let options = {};
let useVuex = false;
let theme = "bootstrap4";
let template = "default";
Vue.use(ClientTable, options, useVuex, theme, template);
Vue.use(Event);

window.axios = require('axios');

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
