<template>
    <aside class="control-sidebar">

      <div class="sidebar-content profile" v-if="showContent == 'profile'">
          
        <div class="sidebar-content-header clearfix">
          <h5 class="float-left">Profil</h5>
          <a class="sidebar-close float-right" href="#" title="Stäng" @click="close"><i class="fas fa-times"></i></a>
        </div>
            
        <div class="mt-1 text-center profile-avatar-icon"><i class="fas fa-user-circle"></i></div>
        <div class="mt-1 text-center"><strong>{{user.fullname}}</strong></div>
        <div class="mt-1 text-center">{{user.email}}</div>

        <button class="btn btn-default btn-block mt-3" data-toggle="modal" data-target="#genericModal"><i class="fa fa-cog mr-2"></i>Inställningar</button>

        <button class="btn btn-default btn-block mt-3" data-toggle="modal" data-target="#genericModal"><i class="fa fa-sign-out-alt mr-2"></i>Logga ut</button>

      </div>

      <div class="sidebar-content search" v-if="showContent == 'search'">
          
        <div class="sidebar-content-header">
          <h5 class="float-left">Sök</h5>
          <a class="sidebar-close float-right" href="#" title="Stäng" @click="close"><i class="fas fa-times"></i></a>
        </div>
              
        <div class="input-group mb-2">
        <input type="text" class="form-control search-nav" id="searchFT" name="searchFT" value="">
        <div class="input-group-prepend">
        <button name="search" id="global-search-btn" class="btn btn-default" data-toggle="modal" data-target="#genericModal"><i class="fa fa-search"></i></button>
        </div>
        </div>

      </div>

      <div class="sidebar-content cardcontent" v-if="showContent == 'card'">
          
        <div class="sidebar-content-header">
          <h5 class="float-left"></h5>
          <a class="sidebar-close float-right" href="#" title="Stäng" @click="close"><i class="fas fa-times"></i></a>
        </div>
          
      </div>

    </aside>
</template>

<script>
export default {
  name: 'SiteRight',
  computed: {

    user() {
      return this.$store.getters.user;
    },
    showContent() {
        return this.$store.getters.layoutContentRightType;
    }
  },
  methods: {

    close() {
      this.$store.commit('toggleContentRight', false);
    }
  }
}
</script>

<style scoped>
</style>