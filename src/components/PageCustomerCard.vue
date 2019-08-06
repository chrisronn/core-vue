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
      
      return {
        emptyCustomer: {
            "id": "",        
            "name": "",
            "address": "",        
            "zipcode": "",
            "city": "",
            "phone": "",
            "mobilephone": "",
            "email": ""
        }
      }
    },
    computed: {

      customer: function() {
        if(this.customerId) {          
          var id = this.customerId;
          var customerInList = this.customers.find(function (el) {
              return el.id==id;
          });
          if(customerInList) {          
            return customerInList;
          }
        }
        return this.emptyCustomer;
      }
    },
    props: ["customerId","customers"],
}
</script>

<style scoped>
</style>
