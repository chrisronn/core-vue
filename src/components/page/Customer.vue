<template>
  <div>
    <ContentLeft />

    <div class="cardpage-top border-bottom">

      <button class="btn btn-sm btn-default main-sidebar-toggler" @click="toggleSidebarForce">
        <i class="fas fa-ellipsis-h"></i>
      </button>

      <div class="top-name"><router-link :to="{name: 'CustomerCard', params: {customerId: customer.id}}">{{customer.name}}</router-link></div>			
            
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

        <router-view></router-view>              

      </div>
    </section>
  </div>
</template>

<script>

import ContentLeft from '../layout/ContentLeft.vue'

export default {
    name: 'Customer',
    components: {
      ContentLeft
    }, 
    data () {      
      return {}
    },
    created: function () {
        this.$store.commit('toggleSidebar', true);
    },
    methods: {
      toggleSidebarForce() {
        this.$store.commit('toggleSidebarForce', true);
      }
    },
    computed: {

      customer: function() {
        if(this.customerId) {          
          var id = this.customerId;
          var customerInList = this.$store.getters.customers.find(function (el) {
              return el.id==id;
          });
          if(customerInList) {          
            this.$store.commit('setCustomer', customerInList);
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
