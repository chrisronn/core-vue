<template>
    <div class="modal fade" id="genericModal" tabindex="-1" role="dialog" aria-labelledby="genericModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="genericModalLabel">Ups...</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>            
          </div>
          <div class="modal-body">
            Inte klart än!
          </div>
          <!--div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div-->
        </div>
      </div>
    </div>   
</template>

<script>
export default {
  name: 'GenericModal',
}
</script>

<style scoped>
</style>