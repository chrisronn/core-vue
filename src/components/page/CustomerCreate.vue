<template>

  <section class="content">
    <div class="container-fluid">

        <h3 class="m-0 mb-3">Ny kund</h3>

        <div class="card card-primary card-outline">

            <form name="form" @submit.prevent="postForm">

                <div class="card-header clearfix">
                    <div class="float-left mb-1 mb-sm-0">
                    <button type="submit" class="btn btn-success mr-2">
                        <i class="fas fa-save mr-1"></i> Spara
                    </button>
                    </div>
                </div>
                <div class="card-body">                

                    <div class="row">

                        <div class="col-sm-6">

                            <legend>Kunduppgifter</legend>

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
                        <div class="col-sm-6">

                            <legend>Kontakt</legend>

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
                                <input type="text" name="email"  v-model="contact.email" class="form-control" required/>
                                </div>
                            </div>

                        </div>  
                        
                    </div>
                </div>          
            </form>
        </div>
    </div>
  </section>

</template>

<script>

export default {
    name: 'CustomerCreate',
    data () {      
        return {}
    },
    computed: {
        customer() {
            return this.$store.getters.customer;
        },
        contact() {
            return this.$store.getters.contact;
        }
    },
    methods: {

        postForm() {
            let cust = this.customer;
            let cont = this.contact;
            this.$store.dispatch('addCustomer', {cust, cont}).then(() => {
                console.log("Customer id: " + this.$store.getters.customer.id);
                console.log("Contact id: " + this.$store.getters.contact.id);
                //this.$router.push("/customer/" + this.$store.getters.customer.id);
            });    
        }
    },
    created() {

        this.$store.commit('toggleSidebar', false);   

    },
    mounted() {
        this.$store.dispatch('resetCustomer');
        this.$store.dispatch('resetContact');
    } 
}

</script>

<style>
</style>
