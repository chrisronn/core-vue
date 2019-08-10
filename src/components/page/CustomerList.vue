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

    fetchCustomers () {
        var url = this.$dataUrlCustomerRead;
        console.log("URL in CustomerList" + url);
        this.axios
        .get(url)
        .then(response => {
          this.$store.commit('setCustomers', response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created: function () {

    this.$store.commit('toggleSidebar', false);   
    
  },
  mounted() {

     this.fetchCustomers(); 

  }
 
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
.VuePagination {
  justify-content: space-between !important;
}
</style>
