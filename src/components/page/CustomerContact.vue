<template>
  <div>
    <h3 class="m-0 mb-3" v-if="this.contactId">Kontakt</h3>
    <h3 class="m-0 mb-3" v-else>Ny kontakt</h3>
    <div class="card card-primary card-outline">

      <form name="form" @submit.prevent="postForm">
        <div class="card-header clearfix">
          <div class="float-left mb-1 mb-sm-0">
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-save mr-1"></i> Spara
            </button>
          </div>
          <div class="float-right mb-1 mb-sm-0">
            <button type="button"  v-if="this.contactId" class="btn btn-default ml-2" @click="deleteContact" title="Ta bort">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">ID:</label>
                <div class="col-sm-7 col-md-8 col-lg-9 form-control-plaintext">{{contact.id}}</div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Förnamn:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="firstname" v-model="contact.firstname" class="form-control" required/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Efternamn:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="lastname" v-model="contact.lastname" class="form-control" required/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Telefon:</label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="phone" v-model="contact.phone" class="form-control"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Mobilnr:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="mobilephone" v-model="contact.mobilephone" class="form-control" required/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">E-post:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="email" v-model="contact.email" class="form-control" required/>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </form>
    </div>    

  </div>
</template>

<script>

export default {
    name: "CustomerContact",   
    data() {
        return {};
    },
    props: ["customerId", "contactId"],
    computed: {
        contact: function() {
            return this.$store.getters.contact;
        },
        contacts: function() {
            return this.$store.getters.contacts;
        }
    },
    methods: {

        loadContact() {

          if(this.contactId && (this.contactId != this.$store.getters.contact.id)) { 
            var custId = this.customerId;
            var contId = this.contactId;
            this.$store.dispatch('loadContact', {customerId: custId, contactId: contId, vm: this}).then(() => {
                  // contact loaded
            });
          }
        },

        deleteContact() {
          var cont = this.contact;
          this.$store.dispatch('deleteContact', {cont, vm: this}).then(() => {
            this.$router.push("/customer/" + this.customerId);
          });
        },

        postForm() {

          this.$store.commit('showLoader',true);
          var cont = this.contact;
          if(this.contactId) {
            this.$store.dispatch('editContact', {cont, vm: this}).then(() => {
                this.$store.commit('showLoader',false);
                this.$router.push("/customer/" + this.customerId);
            });  
          } else {
            cont.custid = this.customerId;
            this.$store.dispatch('addContact', {cont, vm: this}).then(() => {
                this.$store.commit('showLoader',false);
                this.$router.push("/customer/" + this.customerId);
            });  
          }  
        }
    },    
    mounted() {

      if(this.contactId) {
        this.loadContact(); 
      } else {
        this.$store.dispatch('resetContact');
      }
    }
};
</script>

<style scoped>
</style>
