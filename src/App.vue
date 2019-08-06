<template>
  <div id="app">
      <router-view
        :customers="customers"/>        
  </div>
</template>

<script>

//import _ from 'lodash';

export default {
  name: 'app',
  data() {
    return {
      customers: [],
      allCustomers: []
    }
  },
  methods: {

    fetchCustomers () {
        var url = this.$dataUrlCustomerRead;
        console.log("URL" + url);
        this.axios
        .get(url)
        .then(response => {
          this.allCustomers = response.data;
          this.customers = this.allCustomers;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setLayoutHeights () {
        console.log("TODO: set heights");
    }
  },  
  mounted() {
    this.fetchCustomers();    

    window.addEventListener('resize', this.setLayoutHeights);   
  },
  beforeDestroy () {

      window.removeEventListener('resize', this.setLayoutHeights)
  }
}
</script>

<style>

</style>
