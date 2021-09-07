<template>
  <noBackdropModal ref="permissionmodal" class="permission-modal border50 no-footer">
    <template v-slot:header>
      <h2 style="color: black">Security Verification</h2>
    </template>
    <template v-slot:body>
        <PermissionOption />   
    </template>
    <template v-slot:footer>
    </template>
  </noBackdropModal>
</template>
<script>
import noBackdropModal from "../../components/Modal/noBackdropModal.vue";
import PermissionOption from "../Permission/PermissionOption.vue";

export default {
  components: {
    noBackdropModal,
    PermissionOption
  },
  data(){
      return{

      }
  },

  methods: {
  

  },

   


   
  mounted() {
    
  
    this.$refs.permissionmodal.openModal();
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Permission/Permission";
</style>