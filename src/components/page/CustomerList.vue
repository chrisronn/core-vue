<template>

  <section class="content">
    <div class="container-fluid">

      <div class="card card-primary card-outline">
        <div class="card-body">
          <h3>Kunder</h3>
          <v-client-table :columns="columns" :data="data" :options="options">
            <router-link slot="name" slot-scope="props" :to="{name: 'CustomerCard', params: {customerId: props.row.id}}">{{props.row.name}}</router-link>
          </v-client-table>
        </div>
       </div>
    </div>
  </section>

</template>

<script>

export default {
  name: 'CustomerList',
  created: function () {
    this.$store.commit('toggleSidebar', false);   
  },
  components: {},
  computed: {
    url() {
      return this.$dataUrlCustomerRead;
    },
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
 
}

</script>

<style>
.VueTables__sortable {
    cursor: pointer !important;
}
.VueTables__search-field {
  display: flex;
}
.VueTables__search {
  float: right !important;
}
.VueTables__search-field label {
  margin-right: 1rem;
}
.VueTables__pagination {
  justify-content: space-between !important;
}
</style>
