<template>
  <div class="wrapper">
    <div class="content-wrapper">
      
      <SiteHeader />
	
      <section class="content">
        <div class="container-fluid">

          <table class="table table-bordered mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kund</th>
                <th>Adress</th>
                <th>Ort</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(customer,i) in $store.getters.customers" v-bind:key="i">
                <td>{{customer.id}}</td>
                <td><b><router-link :to="{name: 'customercard', params: {customerId: customer.id}}">{{customer.name}}</router-link></b></td>
                <td>{{customer.address}}</td>
                <td>{{customer.city}}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </section>

    </div>
      
    <SiteFooter />
    <ContentRight />
    
  </div>
</template>

<script>

import SiteHeader from './SiteHeader.vue'
import ContentRight from './ContentRight.vue'
import SiteFooter from './SiteFooter.vue'

export default {
  name: 'PageCustomerList',
  components: {
      SiteHeader,
      ContentRight,
      SiteFooter
  }
}
</script>

<style scoped>
</style>
