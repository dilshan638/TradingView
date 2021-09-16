<template>
  <div class="inner-block p-r-60">
    <div class="row">
      <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <div class="profile-pic">
                    <label>
                        <i class="ri-user-fill"></i>
                    </label>
                </div>
              </div>              
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="INspira ID" :value="custom_inspira_id" readonly />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
              </div>
            </div>            
            <div class="col-lg-6">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="Inspira associate" />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="First Name" :value="userawsname"  readonly />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
              </div>
            </div>
          </div>  
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="Last Name" :value="middle_name" readonly />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
              </div>
            </div>            
          </div>     
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="Email Address" :value="userEmailAddress" readonly />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
              </div>
            </div>            
          </div>
          <div class="row profile-mobile">
            <div class="col-lg-12">
              <div class="form-group mb-4" style="position:relative">
                <vue-tel-input
                class="form-control"
                :valid-characters-only="true"
                aria-autocomplete="none"
                v-model="userPhoneNumber"
                v-on:validate="countryChanged"
                :inputOptions="options"
                :dropdownOptions="options2"
                :value="userPhoneNumber"
              >
                </vue-tel-input>
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span> 
                  <div class="changebutton">Change</div>         
              </div>
            </div>            
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group mb-4">
                  <input class="form-control" placeholder="Address" :value="userAddress" readonly />
                  <span class="error-msg" v-if="v$.oldPassword.$error"
                    >{{ v$.oldPassword.$errors[0].$message }}
                  </span>          
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
      custom_inspira_id: "",
      userawsname: "",
      middle_name: "",
      userEmailAddress: "",
      userAddress: "",
      userPhoneNumber: "",

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
              if(Response.data.result.UserAttributes[i].Name == "custom:inspira_id") {
                  this.custom_inspira_id = Response.data.result.UserAttributes[i].Value;
              }
              if(Response.data.result.UserAttributes[i].Name == "name") {
                  this.userawsname = Response.data.result.UserAttributes[i].Value;
              }
              if(Response.data.result.UserAttributes[i].Name == "middle_name") {
                  this.middle_name = Response.data.result.UserAttributes[i].Value;
              }
              if(Response.data.result.UserAttributes[i].Name == "email") {
                  this.userEmailAddress = Response.data.result.UserAttributes[i].Value;
              }
              if(Response.data.result.UserAttributes[i].Name == "custom:addressLine1") {
                  this.userAddress = Response.data.result.UserAttributes[i].Value;
              }  
              if(Response.data.result.UserAttributes[i].Name == "phone_number") {
                  this.userPhoneNumber = Response.data.result.UserAttributes[i].Value;
              }                            
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  },
  mounted(){
    this.getUserData();
  }

  
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Setting/Setting';
</style>