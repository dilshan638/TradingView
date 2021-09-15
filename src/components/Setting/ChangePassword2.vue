<template>
  <div class="inner-block no-border">
    <div class="row">
      <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="card profile-card" @click="changepasswordmodal">
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
</template>

<script>
import useValidate from "@vuelidate/core";
// import { Auth } from "aws-amplify";
import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
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

      connection: null,

      options: {
        placeholder: "Phone Number",
        autoFormat: true,
        mode: "international",
        maxlength: 12,
        validCharactersOnly: true,
      },
      options2: {
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        showFlags: true,
        autofocus: true,
      },
    };
  },

  methods: {
    countryChanged(phoneObject) {
      this.state.mobileno = phoneObject.number;
    },
    async getUserData() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
      axios.get("https://dapi.exus.live/api/mobile/v1/user/cognito/info", {headers: headers})
        .then((Response) => {
          console.log(Response);
          for(let i=0; i < Response.data.result.UserAttributes.length; i++){ 
              if(Response.data.result.UserAttributes[i].Name == "phone_number") {
                  this.userPhoneNumber = Response.data.result.UserAttributes[i].Value;
              }   
              if(Response.data.result.UserAttributes[i].Name == "custom:2fa_ga_status") {
                  this.ga_status = Response.data.result.UserAttributes[i].Value;
              }
              if(Response.data.result.UserAttributes[i].Name == "custom:2fa_mobile_status") {
                  this.mobile_status = Response.data.result.UserAttributes[i].Value;
              }              
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    async changepasswordmodal() {

    },    

  },
  mounted(){
    this.getUserData();
    this.getUseremail();
  }

  
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Setting/Setting';
</style>