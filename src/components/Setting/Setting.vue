<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-6">
                <div class="setting">
                  <h2 >Settings</h2>
                </div>
                <div class="change-password">
                   <p class="no-padding-all">Change Password</p>
                </div>
              </div>
              <div class="col-md-8"></div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <p class="paragraph mb-3">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor
                </p>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="eye-area mb-4">
                    <input
                      v-bind:type="[showNewPassword ? 'text' : 'password']"
                      placeholder="New Password"
                      class="form-control"
                    />
                    <div class="eye-box">
                      <i
                        @click="showNewPassword = !showNewPassword"
                        :class="[
                          showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line',
                        ]"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="eye-area mb-4">
                    <input
                      v-bind:type="[showOldPassword ? 'text' : 'password']"
                      placeholder="Old Password"
                      class="form-control"
                    />
                    <div class="eye-box">
                      <i
                        @click="showOldPassword = !showOldPassword"
                        :class="[
                          showOldPassword ? 'ri-eye-off-line' : 'ri-eye-line',
                        ]"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>                
              </div>
              <div class="row">
                <div class="col-md-4">
                  <div class="eye-area mb-4">
                    <input
                      v-bind:type="[showComfirmPassword ? 'text' : 'password']"
                      placeholder="Confirm New Password"
                      class="form-control"
                    />
                    <div class="eye-box">
                      <i
                        @click="showComfirmPassword = !showComfirmPassword"
                        :class="[
                          showComfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line',
                        ]"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 text-right">
                  <button class="btn" @click="showsecuremodal">Change Password</button>
                </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    </div> 
    <modal ref="forgotpasswordmodal" class="modal2-modal no-modal-footer border50">
      <template v-slot:header>
          <h2>Security Verification</h2>
      </template>
      <template v-slot:body>
        <div class="form-group pos-rel sec-row mb-4">
            <p class="sub-text">Please enter the  6 Digit code that we have sent a to  +9477***121</p>
            <div class="input-group mb-2">
              <input type="text" class="form-control" placeholder="Mobile verification code">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Send</button>
              </div>
            </div>
            <p class="sub-text text-right">Didn't received? <a href="#">Resend</a></p>
        </div>
        <div class="form-group pos-rel sec-row">
            <p class="sub-text">PPlease enter the  6 Digit code that we have sent a to  ab**@**.com</p>
            <div class="input-group mb-2">
              <input type="text" class="form-control" placeholder="Email verification code">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Send</button>
              </div>
            </div>
            <p class="sub-text text-right">Didn't received? <a href="#">Resend</a></p>
        </div>        
        <div class="modal-buttons">
            <button class="mb-3" @click="forgotpassword">Send Now</button>
            <button  class="second-btn mb-3" @click="$refs.forgotpasswordmodal.closeModal()">Cancel</button>
        </div>  
      </template>
    </modal>
  </default-layout>
</template>

<script>
import DefaultLayout from '../../layout/DefaultLayout.vue'
import Modal from '../../components/Modal/Modal.vue'
export default {
  name: "Setting",
  components: { 
      DefaultLayout,
      Modal
    },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showComfirmPassword: false,
    };
  },
  methods: {
    showsecuremodal() {
      this.$refs.forgotpasswordmodal.openModal()
    }
  },
  mounted(){
  }
};
</script>

<style lang="scss" scoped>
  @import "SettingTwo.scss"
</style>