<template>
  <div>
    <ContentLeft />

    <div class="cardpage-top border-bottom">

      <button class="btn btn-sm btn-default main-sidebar-toggler" data-widget="pushmenu">
      <i class="fas fa-ellipsis-h"></i>
      </button>

      <div class="top-name"><a href="/">{{customer.name}}</a></div>			
            
      <!--ul class="nav top-tools ml-auto justify-content-end">
        <li class="nav-item">
          <a class="nav-link" href="#"><i class="fas fa-trash-alt"></i></a>
        </li>
            
        <li class="nav-item">
          <a class="right-toggler nav-link" href="#" title="Öppna"><i class="fas fa-caret-left"></i></a>
        </li>
      </ul-->

    </div>

    <section class="content">


      <div class="container-fluid">

        

        <div class="card card-primary card-outline">
            <div class="card-body">
                <p><b>Kund:</b> {{customer.name}} </p>
            </div>
        </div>            

      </div>
    </section>
  </div>
</template>

<script>

import ContentLeft from '../layout/ContentLeft.vue'

export default {
    name: 'CustomerCard',
    components: {
      ContentLeft
    }, 
    data () {      
      return {}
    },
    created: function () {
        this.$store.commit('toggleSidebar', true);
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
