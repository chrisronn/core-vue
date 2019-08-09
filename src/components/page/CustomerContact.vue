<template>
  <div>
    <h3 class="m-0 mb-3">Kontakt</h3>

    <div class="card card-primary card-outline">
      <div class="card-header clearfix">
        <div class="float-left mb-1 mb-sm-0">
          <button type="button" class="btn btn-success mr-2" data-toggle="modal" data-target="#genericModal">
            <i class="fas fa-save mr-1"></i> Spara
          </button>
        </div>
        <div class="float-right mb-1 mb-sm-0">
          <button type="button" class="btn btn-default ml-2" id="trash" title="Ta bort" data-toggle="modal" data-target="#genericModal">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-6">
            <form name="form" method="POST" action="/">

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
              
            </form>
          </div>
        </div>
      </div>
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
        getContact() {
            if(this.contactId) {          
                var id = this.contactId;
                if(this.contacts.length > 0) {
                    var contactInList = this.contacts.find(function (el) {
                        return el.id==id;
                    });
                    if(contactInList) {          
                        this.$store.commit('setContact', contactInList);
                        return contactInList;
                    }
                }
                this.$store.commit('setContact', this.$store.getters.emptyContact);
                return this.$store.getters.emptyContact;
                
            }  
            return this.$store.getters.emptyContact;
        }
    },
    mounted() {
      this.getContact(); 
    }
};
</script>

<style scoped>
</style>
