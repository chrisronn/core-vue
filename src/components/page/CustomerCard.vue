<template>
  <div>
    <div class="row">
      <section
        id="column1"
        class="col-xl-3 col-lg-4 col-sm-6 box-column connectedSortable ui-sortable"
      >
        <div id="info" class="card card-primary card-outline" style>
          <div class="card-header dragable ui-sortable-handle" style="cursor: move;">
            <h3 class="card-title">
              <i class="fas fa-info-circle fa-fw"></i> Information
            </h3>
            <div class="card-tools">
              <router-link class="btn btn-tool" title="Editera" :to="{name: 'CustomerEdit', params: {customerId: customerId}}">
                <i class="fas fa-pencil-alt"></i>
              </router-link>
              <button class="btn btn-tool box-toggle" title="Ta bort" data-toggle="modal" data-target="#genericModal">
                <i class="fas fa-chevron-up"></i>
              </button>
              <button class="btn btn-tool box-remove" title="Ta bort" data-toggle="modal" data-target="#genericModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body no-padding">
            <table class="table">
              <tbody>
                <tr>
                  <td class="cell-label">KundID:</td>
                  <td>{{customer.id}}</td>
                </tr>
                <tr>
                  <td class="cell-label">Kund:</td>
                  <td>{{customer.name}}</td>
                </tr>
                <tr>
                  <td class="cell-label">Adress:</td>
                  <td>{{customer.address}}</td>
                </tr>
                <tr>
                  <td class="cell-label">Postadress:</td>
                  <td>{{customer.zipcode}} {{customer.city}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section
        id="column2"
        class="col-xl-3 col-lg-4 col-sm-6 box-column connectedSortable ui-sortable"
      ></section>
      <section
        id="column3"
        class="col-xl-3 col-lg-4 col-sm-6 box-column connectedSortable ui-sortable"
      >
        <div id="contacts" class="card card-primary card-outline" style>
          <div class="card-header dragable ui-sortable-handle" style="cursor: move;">
            <h3 class="card-title">
              <i class="fas fa-user fa-fw"></i> Kontakter
            </h3>
            <div class="card-tools">
              <router-link class="btn btn-tool" title="Ny kontakt" :to="{name: 'CustomerContactCreate'}">
                <i class="fas fa-plus"></i>
              </router-link>
              <router-link class="btn btn-tool" title="Kontakter" :to="{name: 'CustomerContactList', params: {customerId: customerId}}">
                 <i class="fas fa-folder-open"></i>
              </router-link>
              <button class="btn btn-tool box-toggle" title="Ta bort" data-toggle="modal" data-target="#genericModal">
                <i class="fas fa-chevron-up"></i>
              </button>
              <button class="btn btn-tool box-remove" title="Ta bort" data-toggle="modal" data-target="#genericModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div class="card-body no-padding" style="display: block;">
            <table class="table">
              <tbody>
                <tr v-for="(contact,i) in contacts" v-bind:key="i">
                  <td class="cell-icon">
                    <i class="far fa-user"></i>
                  </td>
                  <td>
                    <router-link :to="{name: 'CustomerContact', params: {customerId: customerId,contactId: contact.id}}">
                    {{contact.fullname}}
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section id="column4" class="col-xl-3 col-lg-4 col-sm-6 box-column connectedSortable ui-sortable"></section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CustomerCard",
    data() {
      return {};
    },    
    computed: {
      customer: function() {
        return this.$store.getters.customer;
      },
      contacts: function() {
        return this.$store.getters.contacts;
      }
    },
    props: ["customerId"]
  };
</script>

<style scoped>
</style>
