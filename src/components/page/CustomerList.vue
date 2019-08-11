<template>

  <section class="content">
    <div class="container-fluid">

      <h3 class="m-0 mb-3">Kunder</h3>
      
      <div class="card card-primary card-outline">
        <div class="card-body">
          <v-client-table :columns="columns" :data="data" :options="options">
            <router-link slot="name" slot-scope="props" :to="{name: 'CustomerCard', params: {customerId: props.row.id}}">{{props.row.name}}</router-link>
          </v-client-table>
        </div>
      </div>
      
    </div>
  </section>

</template>

<script>

import '@/assets/css/vueTables_custom.css'

export default {
  name: 'CustomerList',
  components: {},
  computed: {
    data() {
      return this.$store.getters.customers;
    }
  },
  data () {      
    return {
      columns: ['id', 'name', 'address', 'city'],
      options: {
        headings: {
          id: 'ID',
          name: 'Kund',
          address: 'Adress',
          city: 'Ort'
        },
        sortIcon: {
          base : 'fa',
          is: 'fa-sort',
          up: 'fa-sort-alpha-down',
          down: 'fa-sort-alpha-up'
        },
        sortable: ['id', 'name', 'address', 'city'],
        filterable: ['id', 'name', 'address', 'city'],
        texts: {
          count: "Visar {from} till {to} av {count} rader|{count} rader|En rad",
          first: 'Första',
          last: 'Sista',
          filter: "Filtrera:",
          filterPlaceholder: "Ange sökord",
          limit: "Rader:",
          page: "Sida:",
          noResults: "Inga rader",
          filterBy: "Filtrera på {column}",
          loading: 'Laddar...',
          defaultOption: 'Välj {column}',
          columns: 'Kolumn'
        },
      }
    }
  },
  methods: {

    loadCustomers () {
      if(this.$store.getters.customers.length  < 1) {
        this.$store.commit('showLoader',true);
        this.$store.dispatch('loadCustomers', {vm: this}).then(() => {
            this.$store.commit('showLoader',false);
        });       
      }
    }
  },
  
  created: function () {

    this.$store.dispatch('showSidebar', false);   
    
  },
  mounted() {

     this.loadCustomers(); 

  }
 
}

</script>

<style>

</style>
