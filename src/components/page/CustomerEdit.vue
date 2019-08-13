<template>
  <div>
    
    <h3 class="m-0 mb-3">Information</h3>

    <div class="card card-primary card-outline">

      <form name="form" @submit.prevent="postForm">

        <div class="card-header clearfix">
          <div class="float-left mb-1 mb-sm-0">
            <button type="submit" class="btn btn-success mr-2">
              <i class="fas fa-save mr-1"></i> Spara
            </button>
          </div>
          <div class="float-right mb-1 mb-sm-0">
            <button type="button" class="btn btn-default ml-2"  @click="deleteCustomer" title="Ta bort">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-6">            

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">ID:</label>
                <div class="col-sm-7 col-md-8 col-lg-9 form-control-plaintext">{{customer.id}}</div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Kundnamn:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="name" v-model="customer.name" class="form-control" required/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Adress:</label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="address" v-model="customer.address" class="form-control"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Postnr:</label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="zipcode" v-model="customer.zipcode" class="form-control"/>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-5 col-md-4 col-lg-3 col-form-label">Ort:<span class="required-icon">*</span></label>
                <div class="col-sm-7 col-md-8 col-lg-9">
                  <input type="text" name="city" v-model="customer.city" class="form-control" required/>
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
    name: 'CustomerEdit',
    data () {      
      return {}
    },
    computed: {

      customer: function() {
        return this.$store.getters.customer;
      }
    },
    props: ["customerId"],
    methods: {

      deleteCustomer() {
        var cust = this.customer;
        this.$store.dispatch('deleteCustomer', {cust, vm: this})
        .then(() => {
          this.$router.push("/customer/list");
        })
        .catch(() => {});
      },

      postForm() {
          this.$store.commit('showLoader',true);
          let cust = this.customer;
          this.$store.dispatch('editCustomer', {cust, vm: this})
          .then(() => {
              this.$store.commit('showLoader',false);
              this.$router.push("/customer/" + this.$store.getters.customer.id);
          })
          .catch(() => {});
      }
    },
}
</script>

<style scoped>
</style>
