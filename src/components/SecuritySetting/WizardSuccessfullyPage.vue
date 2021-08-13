<template>
  <div>
 <modal ref="successfullyModal">
      <template v-slot:header>
        <h2 style="color: black">
          Google Authenticator <br />
          Successfully Enabled
        </h2>
      </template>

      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="Continue" class="loginbtn">
            Continue
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "../Modal/Modal.vue";
export default {
name:'WizardSuccessfullyPage',
 components: {
    
    Modal,
  },

  methods:{
      Successfully() {
      // alert('Success')
      this.$refs.successfullyModal.openModal();
    },
    Continue(){
this.$refs.successfullyModal.closeModal();
 this.$router.push('/securitysetting')
    }


  },

  mounted(){
      this.Successfully()
  }
}
</script>

<style>

</style>