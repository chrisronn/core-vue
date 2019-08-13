<template>
  <div>

    <ContentLeft :customerId="customerId" />    

    <div class="cardpage-top border-bottom">

      <button class="btn btn-sm btn-default main-sidebar-toggler" @click="openSidebar">
        <i class="fas fa-ellipsis-h"></i>
      </button>

      <div class="top-name"><router-link :to="{name: 'CustomerCard', params: {customerId: customerId}}">{{customer.name}}</router-link></div>			
            
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

        <router-view :customerId="customerId"></router-view>              

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
    computed: {

      customer: function() {
        return this.$store.getters.customer
      },
      contacts: function() {
        return this.$store.getters.contacts
      }
    },
    props: ["customerId"],
    methods: {

      openSidebar() {
        this.$store.dispatch('openSidebar', true);
      },

      loadCustomer() {

        if(this.customerId.length > 0 && (this.customerId != this.$store.getters.customer.id)) { 
          let id = this.customerId;
          this.$store.commit('showLoader',true);
          this.$store.dispatch('loadCustomer', {customerId: id, vm: this})
          .then(() => {
              // customer loaded
              this.$store.commit('showLoader',false);
          })
          .catch(() => {});
        }
      },

      loadContacts() {

        if(this.customerId.length > 0 && (this.customerId != this.$store.getters.customer.id)) {  
          let id = this.customerId;
          this.$store.dispatch('loadContacts', {customerId: id, vm: this})
          .then(() => {
              // contacts loaded
          })
          .catch(() => {});
        }
      }
    },
    mounted() {
      this.$store.dispatch('showSidebar',true);
      this.loadCustomer(); 
      this.loadContacts(); 
    }
}
</script>

<style scoped>
</style>
