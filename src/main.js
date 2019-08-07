import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import axios from 'axios'
import VueAxios from 'vue-axios'
import jQuery from 'jquery'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

Vue.config.productionTip = false

import { store } from './store/store'

Vue.prototype.$useExternalApi = process.env.VUE_APP_EXTERNAL_API
Vue.prototype.$homeUrl = process.env.VUE_APP_URL_HOME
Vue.prototype.$dataUrlCustomerRead = process.env.VUE_APP_URL_DATA_CUSTOMER_READ

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

global.jQuery = jQuery
global.$ = jQuery

import '@/assets/css/layout.css'
import '@/assets/css/skin.css'
import '@/assets/css/custom.css'
import '@/assets/css/print.css'

import SiteLayout from "./components/layout/SiteLayout";
import CustomerList from "./components/page/CustomerList";
import CustomerCard from "./components/page/CustomerCard";

const router = new VueRouter({
  base: process.env.VUE_APP_URL_ROOT,
  mode: process.env.VUE_APP_URL_ROUTE_MODE,
  hash: /^true$/i.test(process.env.VUE_APP_URL_ROUTE_HASH),
  linkActiveClass: "active",
  routes: [
    {
      path: '/start',
      name: 'Start',
      component: SiteLayout,
      redirect: '/customer/list'
    },
    {
      path: '/customer',
      component: SiteLayout,
      redirect: '/customer/list',
      children: [
        {
          path: 'list',
          name: 'CustomerList',
          component: CustomerList
        },
        {
          path: 'card/:customerId',
          name: 'CustomerCard',
          component: CustomerCard,
          props: true
        }
      ]
    },
    { 
      path: '*', 
      redirect: '/start' 
    }
  ]
  /*
    { 
      path: "/start", 
      name: "start", 
      component: PageCustomerList  
    },
    { path: "/customer/card/:customerId", name: "customercard", component: PageCustomerCard, props: true },
  */
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
