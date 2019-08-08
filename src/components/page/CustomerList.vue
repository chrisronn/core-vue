<template>

  <section class="content">
    <div class="container-fluid">

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
        sortable: ['id', 'name', 'address', 'city'],
        filterable: ['id', 'name', 'address', 'city']
      }
    }
  },
 
}

</script>

<style scoped>
</style>
