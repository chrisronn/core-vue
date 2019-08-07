<template>
  <div id="app">
      <router-view />        
  </div>
</template>

<script>

//import _ from 'lodash';
/*
window.$ = require('jquery')
window.JQuery = require('jquery')

var $ = require( 'jquery' );
require( 'datatables.net' )( window, $ );
require( 'datatables.net-bs4' )( window, $ );
require( 'datatables.net-responsive' )( window, $ );
require( 'datatables.net-responsive-bs4' )( window, $ );
*/

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {

    fetchCustomers () {
        var url = this.$dataUrlCustomerRead;
        console.log("URL" + url);
        this.axios
        .get(url)
        .then(response => {
          this.$store.commit('setCustomers', response.data)
          //this.allCustomers = response.data;
          //this.customers = this.allCustomers;
        })
        .catch(error => {
          console.log(error);
        });
    },
    setLayoutHeights () {

      var windowHeight = window.innerHeight;
      var siteHeaderHeight = document.getElementById('siteHeader').clientHeight;
      var siteFooterHeight = document.getElementById('siteFooter').clientHeight;
      var contentLeftHeight =  document.getElementById('contentLeft') ? document.getElementById('contentLeft').clientHeight : 0;

      var max = windowHeight;
      if(contentLeftHeight > windowHeight) {
        max = contentLeftHeight;
      }
      var offset = 1;
      var contentHeight = max - siteHeaderHeight - siteFooterHeight - offset;
      var sidebarHeight = max - siteHeaderHeight - offset;

      this.$store.commit('setLayoutHeights', contentHeight, sidebarHeight);
    }
  },  
  mounted() {
    
    this.$nextTick(() => {
      //$("body").css("color","red");
    });
    
    this.fetchCustomers();    
    this.setLayoutHeights ();
    window.addEventListener('resize', this.setLayoutHeights);   
  },
  beforeDestroy () {

      window.removeEventListener('resize', this.setLayoutHeights)
  }
}
</script>

<style>

</style>
