<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-6">
                <div class="setting">
                  <h2>Settings</h2>
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
                      v-model="state.oldPassword"
                    />
                    <span class="error-msg" v-if="v$.oldPassword.$error"
                      >{{ v$.oldPassword.$errors[0].$message }}
                    </span>

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
                      v-model="state.newPassword"
                    />
                    <span class="error-msg" v-if="v$.newPassword.$error"
                      >{{ v$.newPassword.$errors[0].$message }}
                    </span>
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
                      v-model="state.confirmPassword"
                    />
                    <span class="error-msg" v-if="v$.confirmPassword.$error"
                      >{{ v$.confirmPassword.$errors[0].$message }}
                    </span>
                    <div class="eye-box">
                      <i
                        @click="showComfirmPassword = !showComfirmPassword"
                        :class="[
                          showComfirmPassword
                            ? 'ri-eye-off-line'
                            : 'ri-eye-line',
                        ]"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>                 
                </div>
              </div>
            </div>
            <div>
              <button class="btn" @click="changePassword">
                Change Password
              </button>
              <button  v-on:click="sendMessage('hello')">Send Message</button>
              </div>  
              <div class="row">
                  <div class="col-md-4">
                    <button class="btn pull-right" @click="changePassword">
                      Change Password
                    </button>                     
                  </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </default-layout>
</template>

<script>
import useValidate from "@vuelidate/core";
import DefaultLayout from "../../layout/DefaultLayout.vue";
import { Auth } from "aws-amplify";
import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Setting",
  components: {
    DefaultLayout,
  },
  setup() {
    const state = reactive({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const rules = computed(() => {
      return {
        oldPassword: {
          required,
        },

        newPassword: {
          required,
          minLength: minLength(8),
            maxLength: maxLength(12),
        },

        confirmPassword: {
          required,
          sameAs: sameAs(state.newPassword),
          minLength: minLength(8),
            maxLength: maxLength(12),
        },
      };
    });

    const v$ = useValidate(rules, state);
    return { state, v$ };
  },

  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      showComfirmPassword: false,

      connection: null
    };
  },

  methods: {
    changePassword() {
      this.v$.$validate();

      if (!this.v$.$error) {
        console.log("Form successfully submitted.");
        Auth.currentAuthenticatedUser()
          .then((user) => {
            return Auth.changePassword(
              user,
              this.state.oldPassword,
              this.state.newPassword
            );
          })
          .then((data) => {
             this.$toast.show('Your password change successfully..!!', { 
          type: "success",
          position: "top-right",
        });
            
            console.log(data)})
          .catch((err) => {
            console.log(err)
            this.$toast.show('Does not match your old password, Please check..!!', {
          type: "error",
          position: "top-right",
        });
          });
      } else {
        console.log("Form Failed Validation");
      }
    },

     sendMessage: function(message) {
      console.log(this.connection);
      this.connection.send(message);
    }
  },

   created: function() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://echo.websocket.org")

    this.connection.onmessage = function(event) {
      console.log(event);
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  }
};
</script>

<style lang="scss" scoped>
@import "SettingTwo.scss";
</style>