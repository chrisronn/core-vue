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
import _ from 'lodash';

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
      },
      getCustomer() {
        if(this.customerId) {          
          var id = this.customerId;

          var url = this.$dataUrlCustomerReadOne;
          if(this.$useExternalApi=="true") {
            url += id;
            // TODO: implement later
          } else {
            this.axios
            .get(url)
            .then(response => {
              if(response.data.length > 0) {
                var customerInList = response.data.find(function (el) {
                    return el.id==id;
                });
                if(customerInList) {          
                  this.$store.commit('setCustomer', customerInList);
                  return customerInList;
                }
              }
              this.$store.commit('setCustomer', this.$store.getters.customerModel);
              return this.$store.getters.customerModel;
            })
            .catch(error => {
              console.log(error);
              this.$store.commit('setCustomer', this.$store.getters.customerModel);
              return this.$store.getters.customerModel;
            });
          } 
        }  
        return this.$store.getters.customerModel;
      },
      fetchContacts() {
        if(this.customerId) {  
          var id = this.customerId;        
          var url = this.$dataUrlContactRead;
          this.axios
          .get(url)
          .then(response => {
            let conts = _.filter(response.data, { 'custid': id });
            this.$store.commit('setContacts', conts)
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
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
    mounted() {

      this.getCustomer(); 
      this.fetchContacts(); 
      
    }
}
</script>

<style scoped>
</style>
