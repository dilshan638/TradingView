<template>
  <div class="inner-block">
    <h3>Your Profile</h3>
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group mb-4">
            <input class="form-control" placeholder="First Name" />
            <span class="error-msg" v-if="v$.oldPassword.$error"
              >{{ v$.oldPassword.$errors[0].$message }}
            </span>          
        </div>
        <div class="form-group mb-4">
            <input class="form-control" placeholder="Last Name" />
            <span class="error-msg" v-if="v$.oldPassword.$error"
              >{{ v$.oldPassword.$errors[0].$message }}
            </span>          
        </div>  
        <div class="form-group mb-4">
            <input class="form-control" placeholder="Email" />
            <span class="error-msg" v-if="v$.oldPassword.$error"
              >{{ v$.oldPassword.$errors[0].$message }}
            </span>          
        </div>   
        <div class="form-group mb-4">
            <input class="form-control" placeholder="Country" />
            <span class="error-msg" v-if="v$.oldPassword.$error"
              >{{ v$.oldPassword.$errors[0].$message }}
            </span>          
        </div>  
        <div class="form-group mb-4">
            <input class="form-control" placeholder="Address" />
            <span class="error-msg" v-if="v$.oldPassword.$error"
              >{{ v$.oldPassword.$errors[0].$message }}
            </span>          
        </div>                            
      </div>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
var generator = require('generate-password');
import { Auth } from "aws-amplify";
import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
export default {
  name: "Setting",
  components: {
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
@import "SettingTwo.scss";
</style>