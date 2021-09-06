<template>
    <noBackdropModal ref="permissionmodal" class="permission-modal border50">
        <template v-slot:header>
            <h2 style="color:black">Security Verification</h2>
        </template>
        <template v-slot:body>
            <div class="form-group single-row pos-rel security-row">
                <p>Please enter the  6 Digit code that we have sent a to  +9477***121</p>
                <input type="text" class="form-control" placeholder="Enter mobile verfication code" />
                  <img  src="images/icons/correct.png" class="pos-img" />
                  <img  src="images/icons/ic_fail@3x.webp" class="pos-img" />
            </div>
            <div class="form-group single-row pos-rel security-row">
                <p>Please enter the  6 Digit code that we have sent a to  ab**@**.com</p>
                <input type="text" class="form-control" placeholder="Enter Email verfication code" />
                  <img  src="images/icons/correct.png" class="pos-img" />
                  <img  src="images/icons/ic_fail@3x.webp" class="pos-img" />
            </div>   
            <div class="form-group single-row pos-rel security-row">
                <p>Please enter the 6 Digit code from Google Authenticator.</p>
                <input type="text" class="form-control" placeholder="Enter Google Authenticator code" />
                  <img  src="images/icons/correct.png" class="pos-img" />
                  <img  src="images/icons/ic_fail@3x.webp" class="pos-img" />
            </div>                      
        </template>
        <template v-slot:footer>
            <div>
                <button class="loginbtn">Submit</button>
            </div>
        </template>
    </noBackdropModal>
</template>
<script>
import noBackdropModal from '../../components/Modal/noBackdropModal.vue';
export default {
    components: {
        noBackdropModal
    },
    mounted() {
        this.$refs.permissionmodal.openModal();
    }

}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/Permission/Permission";
</style>