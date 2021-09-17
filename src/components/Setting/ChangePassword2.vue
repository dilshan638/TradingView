<template>
  <div class="inner-block no-border">
    <div class="row">
      <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="card profile-card reset-card" @click="changepasswordmodal">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <h3>Reset your Password</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
 <!--Reset Password modal -->
    <modal ref="resetpasswordmodal" class="s-modal border50 overflow-visible">
      <template v-slot:header>
        <h2 style="color: black">Reset Password</h2>
      </template>
      <template v-slot:body>
        <div class="row">
          <div class="col-lg-12">
            <div class="eye-area mb-4">
              <input
                v-bind:type="[showOldPassword ? 'text' : 'password']"
                placeholder="Old Password"
                class="form-control"
                v-model="state.oldPassword"
              />
              <span class="error-msg" v-if="v$.oldPassword.$error"
                >{{ v$.oldPassword.$errors[0].$message }}
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
          <div class="col-lg-12">
            <div class="input-group eye-area mb-4">
              <div class="input_container" v-if="showPasswordLength">
                  <ul>
                      <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                      <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                      <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                      <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character</li>
                  </ul>
              </div>   
              <div class="password-suggestion-box" v-if="showPasswordSuggestion">
                  <h3>Auto generated Password</h3>
                  <i class="ri-close-line remove-icon" @click="closepasswordbox"></i>
                  <div class="password-view">
                      {{passwordsuggestionvalue}}
                  </div>
                  <div class="bottom-btn">
                      <button class="btn btn-outline" @click="passwordGenereate">Generate New</button>
                      <button class="btn btn-primary" @click="usePassword">Use this</button>
                  </div>
              </div>                           
              <input
              @focus="showPasswordLength = true" @input="checkPassword" @blur="showPasswordLength = false"
                v-bind:type="[showNewPassword ? 'text' : 'password']"
                placeholder="New Password"
                class="form-control"
                v-model="state.newPassword"
              />
              <span class="error-msg" v-if="v$.newPassword.$error"
                >{{ v$.newPassword.$errors[0].$message }}
              </span>
              <div class="eye-box new-eye">
                <i
                  @click="showNewPassword = !showNewPassword"
                  :class="[
                    showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line',
                  ]"
                  aria-hidden="true"
                ></i>
              </div>
              <div class="input-group-append">
                  <button class="btn btn-outline-secondary input-group-btn sub-action" @click="showPasswordSuggestion = true" type="button">
                      <i class="ri-lock-password-line"></i>
                  </button>
                  <button class="btn btn-outline-secondary input-group-btn sub-action" @click="showPasswordSuggestion = true" type="button">
                      <i class="ri-lock-password-line"></i>
                  </button>                  
              </div>                    
            </div>
          </div>                
        </div>
        <div class="row">
          <div class="col-lg-12">
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
      </template>
      <template v-slot:footer>
        <div>
          <button @click="changePassword" class="loginbtn">Change Password</button>
        </div>
      </template>
    </modal>
    <!-- End Reset Password modal -->    
</template>

<script>
import useValidate from "@vuelidate/core";
var generator = require('generate-password');
import { Auth } from "aws-amplify";
import Modal from "../Modal/Modal.vue";
import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Setting",
  components: {
    Modal
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
          sameAs: !sameAs(state.newPassword),
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
      showPasswordLength: false,

      passwordsuggestionvalue: '',

      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,  

      showPasswordSuggestion: false,

      connection: null
    };
  },

  methods: {
    changepasswordmodal() {
      this.$refs.resetpasswordmodal.openModal();
    },
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
    checkPassword() {
        this.password_length = this.state.newPassword.length;
        //eslint-disable-next-line
        const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (this.password_length >= 8) {
            this.contains_eight_characters = true;
        } else {
            this.contains_eight_characters = false;
        }
        this.contains_number = /\d/.test(this.state.newPassword);
        this.contains_uppercase = /[A-Z]/.test(this.state.newPassword);
        this.contains_special_character = format.test(this.state.newPassword);
        if (this.contains_eight_characters === true &&
                this.contains_special_character === true &&
                this.contains_uppercase === true &&
                this.contains_number === true) {
                    this.valid_password = true;			
        } else {
            this.valid_password = false;
        }
    },
    async passwordGenereate() { //
        var passwordgene = generator.generate({
            length: 12,
            numbers: true,
            uppercase: true,
            lowercase: true,
            symbols: true
        });            
          console.log(passwordgene);
          this.passwordsuggestionvalue = passwordgene
    },    
    async usePassword() {
      this.state.newPassword=this.passwordsuggestionvalue
      console.log( this.state.newPassword)
      this.showPasswordSuggestion = false
      this.checkPassword();
    },    
    closepasswordbox() {
        this.showPasswordSuggestion = false;
    }    
  },
  mounted(){
    this.passwordGenereate();
  }

  
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Setting/Setting';
</style>