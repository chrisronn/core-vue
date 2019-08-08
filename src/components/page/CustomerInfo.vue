<template>
  <div>
    
    <div class="card card-primary card-outline">
        <div class="card-body">
            <p>Hello Info!!!</p>
            <p><b>Kund:</b> {{customer.name}} </p>
        </div>
    </div>            

  </div>
</template>

<script>

export default {
    name: 'CustomerInfo',
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
