<template>
  <div>
    
    <div class="card card-primary card-outline">
        <div class="card-body">
            <p>Hello Contacts!!!</p>
            <p><b>Kund:</b> {{customer.name}} </p>
        </div>
    </div>            

  </div>
</template>

<script>

export default {
    name: 'CustomerContactList',
    data () {      
      return {}
    },
    computed: {

      customer: function() {
        return this.$store.getters.customer;
      }
    }
}
</script>

<style scoped>
</style>
