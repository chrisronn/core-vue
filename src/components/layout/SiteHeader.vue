<template>

    <header id="siteHeader" class="main-header fixed-top">

      <a :href=this.$homeUrl class="brand-link">
      <span>&nbsp;</span>
      </a>
            
      <nav class="navbar navbar-expand-sm">
              
      <button class="navbar-dark navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
      </button>
          
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
      <li class="nav-item">
      <span class="nav-header">CRM</span>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'Start'}">Kunder</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'CustomerCreate'}">Ny kund</router-link>
      </li>
      </ul>
      </div>   

      <ul class="navbar-nav ml-auto navbar-tools">
      <li class="nav-item">
      </li>
      <li class="nav-item">
      <a class="nav-link" id="navsearch" href="#" @click="openSearch">
      <i class="fas fa-search"></i>
      </a>
      </li>
      <li class="nav-item">
      <a class="nav-link" id="navprofile" href="#" @click="openProfile">
      <i class="fas fa-user-circle"></i><span class="nav-link-text ml-2">{{user.fullname}}</span>
      </a>
      </li>
      </ul>

      </nav>
            
      </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {

    openSearch() {
      this.$store.commit('toggleContentRight', true);
      this.$store.commit('setContentRight', "search");
    },
    openProfile() {
      this.$store.commit('toggleContentRight', true);
      this.$store.commit('setContentRight', "profile");
    }
  }
}
</script>

<style scoped>
</style>