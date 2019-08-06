import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

import PageCustomerList from "./components/PageCustomerList";
import PageCustomerCard from "./components/PageCustomerCard";

import { store } from './store/store'

Vue.prototype.$useExternalApi = process.env.VUE_APP_EXTERNAL_API
Vue.prototype.$homeUrl = process.env.VUE_APP_URL_HOME
Vue.prototype.$dataUrlCustomerRead = process.env.VUE_APP_URL_DATA_CUSTOMER_READ

Vue.use(VueAxios, axios)
Vue.use(VueRouter)

const router = new VueRouter({
  base: process.env.VUE_APP_URL_ROOT,
  mode: process.env.VUE_APP_URL_ROUTE_MODE,
  hash: /^true$/i.test(process.env.VUE_APP_URL_ROUTE_HASH),
  linkActiveClass: "active",
  routes: [
    { path: "/start", name: "start", component: PageCustomerList  },
    { path: "/customer/card/:customerId", name: "customercard", component: PageCustomerCard, props: true },
    { path: '*', redirect: '/start' }]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
