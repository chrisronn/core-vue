<template>
  <div class="wrapper">
    <div class="content-wrapper">
      
      <SiteHeader />

      <section class="content">
        <div class="container-fluid">

            <div class="card card-primary card-outline">
                <div class='card-body'>
                    <p><b>Kund:</b> {{customer.name}} </p>
                </div>
            </div>            

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
    name: 'PageCustomerCard',
    components: {
        SiteHeader,
        ContentRight,
        SiteFooter
    }, 
    data () {      
      return {}
    },
    computed: {

      customer: function() {
        if(this.customerId) {          
          var id = this.customerId;
          var customerInList = this.$store.getters.customers.find(function (el) {
              return el.id==id;
          });
          if(customerInList) {          
            return customerInList;
          }
        }
        return this.$store.getters.emptyCustomer;
      }
    },
    props: ["customerId"],
}
</script>

<style scoped>
</style>
