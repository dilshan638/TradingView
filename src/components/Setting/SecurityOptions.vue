<template>
<div>
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
                      <button class="btn btn-outline" v-if="fa_mobile_status == true">Remove</button>
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
                      <button class="btn btn-outline" v-show="fa_ga_status =='true'">Remove</button>
                     <button class="btn btn-primary" v-show="fa_ga_status =='false' || fa_ga_status ==null" @click="openWizard">Activate</button>
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
  <modal ref="gaEnableModal" class="wizard-modal">
      <template v-slot:header> </template>
      <template v-slot:body>
        <wizard />
      </template>
      <template v-slot:footer> </template>
    </modal>

    
</div> 
</template>

<script>
import useValidate from "@vuelidate/core";
// import { Auth } from "aws-amplify";
import Wizard from "../SecuritySetting/Wizard.vue";
import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
import Modal from "../Modal/Modal.vue";
export default {
  name: "Setting",
  components: {
    Modal,
    Wizard

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

      fa_ga_status:"",
      fa_email_status:"",
      fa_mobile_status:"",
      phone_number:"",
      stage_code:""


    };
  },

  methods: {
    countryChanged(phoneObject) {
      this.state.mobileno = phoneObject.number;
    },
    async status() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };

      axios
        .get("https://dapi.exus.live/api/mobile/v1/user/cognito/info", {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive.data.result.UserAttributes);
         for(let i = 0; i < responsive.data.result.UserAttributes.length; i++){

           if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
              this.fa_ga_status = responsive.data.result.UserAttributes[i].Value;
           }

           if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_email_status"){
              this.fa_email_status = responsive.data.result.UserAttributes[i].Value;
           }

              if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_mobile_status"){
              this.fa_mobile_status = responsive.data.result.UserAttributes[i].Value;
           }

           if(responsive.data.result.UserAttributes[i].Name=="phone_number"){
              this.phone_number = responsive.data.result.UserAttributes[i].Value;

              console.log(this.phone_number)
           }
         
         }
        })
        .catch(function (error) {
          console.log(error);
        });
       // gaEnableModal
       
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
    
    async openWizard(){
       this.$refs.gaEnableModal.openModal();
    },
     async clearStatus(){
      const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
        };

        axios
          .get("https://dapi.exus.live/api/twofa/clear", {
            headers: headers,
          })
          .then((res) => {
            this.stage_code=res.data.code
            console.log(this.stage_code)
           })
          .catch(function (error) {
            console.log(error.response.data);
          });
    
    },

  },
  mounted(){
    this.getUseremail();
    this.status()
  }

  
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Setting/Setting';
</style>