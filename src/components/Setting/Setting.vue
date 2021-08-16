<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card table-card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-6 ">

                <div class="setting">
                  <h2 >Settings</h2>
                </div>

                <div class="change-password">
                   <h2 class="Change-Password">Change Password</h2>
                </div>
               
                <hr class="Line-23" />
              </div>
              <div class="col-md-8"></div>
            </div>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <p class="paragraph">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor
                </p>
              </div>
            </div>

            <div class="row textFields" >
                
              <div class="row sec-row">
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

             


            </div>
            <div >
                  <button class="btn" >Change Password</button>
              </div>
          </div>
            
        </div>
        
      </div>
   
  
    </div>
    
  </default-layout>
</template>

<script>
import DefaultLayout from '../../layout/DefaultLayout.vue'
export default {
  name: "Setting",
  components: { 
      DefaultLayout,
      
    },
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showComfirmPassword: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "SettingTwo.scss"
</style>