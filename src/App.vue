<template>
  <div id="app">
      <router-view />        
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {

    loadUser () {
      if(!this.$store.getters.user) {
        this.$store.dispatch('loadUser', {vm: this})
        .then(() => {
            // user loaded
        })
        .catch(() => {});   
      }
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

      this.$store.dispatch('setLayoutHeights', {contentHeight, sidebarHeight});
    }
  },  
  created() {
    this.loadUser();
  },
  mounted() {
    
    this.$nextTick(() => {
      //$("body").css("color","red");
    });    
    
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
