<template>
    <aside class="control-sidebar">

      <div class="sidebar-content profile">
          
      <div class="sidebar-content-header clearfix">
      <h5 class="float-left">Profil</h5>
      <a class="sidebar-close float-right" href="#" title="Stäng"><i class="fas fa-times"></i></a>
      </div>
          
      <div class="mt-1 text-center profile-avatar-icon"><i class="fas fa-user-circle"></i></div>
      <div class="mt-1 text-center"><strong>Per Karlsson</strong></div>
      <div class="mt-1 text-center">per.karlsson@email.se</div>

      <a href="/" class="btn btn-default btn-block mt-3"><i class="fa fa-cog mr-2"></i>Inställningar</a>

      <a href="#" class="btn btn-default btn-block mt-3"><i class="fa fa-sign-out-alt mr-2"></i>Logga ut</a>

      </div>
      <div class="sidebar-content search">
          
      <div class="sidebar-content-header">
      <h5 class="float-left">Sök</h5>
      <a class="sidebar-close float-right" href="#" title="Stäng"><i class="fas fa-times"></i></a>
      </div>
          
      <div class="input-group mb-2">
      <input type="text" class="form-control search-nav" id="searchFT" name="searchFT" value="">
      <div class="input-group-prepend">
      <button name="search" id="global-search-btn" class="btn btn-default"><i class="fa fa-search"></i></button>
      </div>
      </div>

      </div>
      <div class="sidebar-content cardcontent">
          
      <div class="sidebar-content-header">
      <h5 class="float-left"></h5>
      <a class="sidebar-close float-right" href="#" title="Stäng"><i class="fas fa-times"></i></a>
      </div>
          
      </div>
    </aside>
</template>

<script>
export default {
  name: 'SiteRight',
}
</script>

<style scoped>
</style>