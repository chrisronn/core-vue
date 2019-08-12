<template>
  <div>
      <h3 class="m-0 mb-3">Kontakter</h3>

      <div class="card card-primary card-outline">
        <div class="card-body">
          <v-client-table :columns="columns" :data="data" :options="options">
            <router-link slot="fullname" slot-scope="props" :to="{name: 'CustomerContact', params: {customerId: props.row.custid,contactId: props.row.id}}">{{props.row.fullname}}</router-link>
          </v-client-table>
        </div>
      </div>     

  </div>
</template>

<script>

import '@/assets/css/vueTables_custom.css'

export default {
  name: 'CustomerContactList',
  computed: {
    customer: function() {
      return this.$store.getters.customer;
    },
    data() {
      return this.$store.getters.contacts;
    }
  },
  props: ["customerId"],
  data () {      
    return {
      columns: ['id', 'fullname', 'mobilephone', 'email'],
      options: {
        headings: {
          id: 'ID',
          fullname: 'Kontakt',
          mobilephone: 'Mobilnr.',
          email: 'E-post'
        },
        sortIcon: {
          base : 'fa',
          is: 'fa-sort',
          up: 'fa-sort-alpha-down',
          down: 'fa-sort-alpha-up'
        },
        sortable: ['id', 'fullname', 'mobilephone', 'email'],
        filterable: false,
        texts: {
          count: "Visar {from} till {to} av {count} rader|{count} rader|1 rad",
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
  }
    
}
</script>

<style>

</style>
