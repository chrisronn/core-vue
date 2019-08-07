<template>

  <section class="content">
    <div class="container-fluid">

<table id="customer-table" class="table table-bordered mt-3">
      <thead>
        <tr>
            <th>ID</th>
            <th>Kund</th>
            <th>Adress</th>
            <th>Ort</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>

      <!--table class="table table-bordered mt-3">
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
            <td><b><router-link :to="{name: 'CustomerCard', params: {customerId: customer.id}}">{{customer.name}}</router-link></b></td>
            <td>{{customer.address}}</td>
            <td>{{customer.city}}</td>
          </tr>
        </tbody>
      </table--> 
    </div>
  </section>

</template>

<script>
//import { maxHeaderSize } from 'http';

//var $ = require( 'jquery' );
//require( 'datatables.net' )( window, $ );
//require( 'datatables.net-bs4' )( window, $ );
//require( 'datatables.net-responsive' )( window, $ );
//require( 'datatables.net-responsive-bs4' )( window, $ );

export default {
  name: 'CustomerList',
  created: function () {
    this.$store.commit('toggleSidebar', false);
  },
  components: {},
  data () {      
    return {
      dataTable:null
    }
  },
  mounted() {

    this.dataTable = $('#customer-table').DataTable({});
    
    this.$store.getters.customers.forEach(customer=>{
      this.dataTable.row.add([
        customer.id,
        '<router-link :to="{name: CustomerCard, params: {customerId: customer.id}}">'+customer.name+'</a>',
        customer.address,
        customer.city
      ]).draw(false) 
    })

  }
}
</script>

<style scoped>
</style>
