<template>
  <div class="inner-block no-border">
    <div class="row">
      <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="card profile-card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-5">
                      <h3>SMS Verification</h3>
                    </div>
                    <div class="col-lg-7">
                      <p>077******48</p>
                      <button class="btn btn-outline" v-if="mobile_status == 'true'">Remove</button>
                       <button class="btn btn-primary" v-if="mobile_status == 'true'">Change</button>
                       <button class="btn btn-primary" v-else>Activate</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card profile-card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-5">
                      <h3>Google Authenticator</h3>
                    </div>
                    <div class="col-lg-7">
                      <button class="btn btn-outline" v-if="ga_status =='true'">Remove</button>
                      <button class="btn btn-primary" v-if="ga_status =='true'">Change</button>
                      <button class="btn btn-primary" v-else>Activate</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card profile-card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-5">
                      <h3>Email Verification</h3>
                    </div>
                    <div class="col-lg-7">
                      <p>{{ emailmask }}</p>
                      <button class="btn btn-outline">Activated</button>
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
      custom_inspira_id: "",
      userawsname: "",
      middle_name: "",
      userEmailAddress: "",
      userAddress: "",
      userPhoneNumber: "",
      emailmask: "",
      ga_status: "",
      mobile_status: "",

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
    async getUseremail() {
        this.emailmask = localStorage.getItem("emailmask");
        let hide = this.emailmask.split("@")[0].length - 4;//<-- number of characters to hide
        var r = new RegExp(".{"+hide+"}@", "g")
        this.emailmask = this.emailmask.replace(r, "*@" );
    },
    // async getUserMobile() {
    //   this.usermobilenumber = localStorage.getItem("usermobile").slice(0, 2) + localStorage.getItem("usermobile").slice(2).replace(/.(?=...)/g, '*');
    // },    

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