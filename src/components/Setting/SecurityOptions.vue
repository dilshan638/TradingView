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
                      <button class="btn btn-outline" v-show="fa_ga_status =='true'" @click="openmodaldisableGA">Remove</button>
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

      <!-- GA remove Modal -->
      <modal ref="disableGAModal" class=" modal2-modal border50 no-modal-body-b">
      <template v-slot:header>
        <h2 style="color: black">
        Security Verification
        </h2>
      </template>

      <template v-slot:body>

         <div class="form-group pos-rel sec-row mb-3 mt-3" v-if="fa_mobile_status == 'false'">
         <p class="sub-text">
        Please enter the 6 Digit code that we have sent a to +947******89
       
      </p>
      <div class="input-group mb-2">
        <input
       
          type="text"
          class="form-control"
          placeholder="Mobile verification code"
           v-model="mobileCodeMobGARemove"
           @input="mobileCodeSubmitGARemove"
          :disabled="mobileSuccessGARemove == true"
          
        />

        <div class="input-group-append">
          <button
           v-if="btnShowMobileGARemove"
           class="btn btn-outline-secondary"
            style="margin-top: 0rem; margin-left: 0rem"
            type="button"
             @click="sendMobileCodeGARemove"
          >
            Send
          </button>
         <img  v-if="mobileSuccessGARemove && !mobileWrongGARemove" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img v-if="mobileWrongGARemove" src="images/icons/ic_fail@3x.webp" class="pos-img" />
        </div>
      </div>
      <!-- <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div> -->
      <div class="time-socket" v-if="timerCount > 0">
        Resend OTP in 0:0:{{ timerCount }}
      </div>
      <p
        class="sub-text text-right"
        v-if="!mobileSuccessGARemove " 
        
      >
        Didn't received?
        <a class="link" @click="sendMobileCodeGARemove">Resend</a>
      </p>
        </div>

    <div class="form-group pos-rel sec-row txtEmail"  v-if="fa_email_status == 'true'">
      <p class="sub-text">
        Please enter the 6 Digit code that we have sent a to dil***@**.com
      </p>
      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Email verification code"
          @input="emailCodeSubmitGARemove"
           :disabled="EmailuccessGARemove == true"
           v-model="emailCodeGARemove"
        />
        <div class="input-group-append">
          <button
            v-if="btnShowEmailMobGARemove"
            class="btn btn-outline-secondary"
            style="margin-top: 0rem; margin-left: 0rem"
            @click="sendEmailVerificationCodeGARemove"
          >
            Send
          </button>
         <img  v-if="EmailuccessGARemove && !EmailWrongGARemove" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img   v-if="EmailWrongGARemove" src="images/icons/ic_fail@3x.webp" class="pos-img" />
         </div>
      </div>

   <!-- <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div> -->
      <p class="sub-text text-right" v-if="!EmailuccessGARemove">
        Didn't received?
        <a class="link"   @click="sendEmailVerificationCodeGARemove" >Resend</a>
      </p>
        </div>
        <div class="input-group mb-2 mt-3">
        <input
          type="text"
          class="form-control"
          placeholder="Google Authentication Code"
           v-model="gaCodeGARemove"
           @input="submitGACodeGARemove"
           :disabled="GASuccess== true"
          
        />
        <div class="input-group-append">
          <img  v-if="GASuccess && !GAWrong" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img   v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
       </div>
        </div>
      </template>
      <template v-slot:footer >
        <div class="gaRemoveContinueBtn">
          <button  class="loginbtn btnGA" @click="GARemoveContinue">Continue</button>
          <button
            class="second-btn mb-3" @click="$refs.disableGAModal.closeModal()">
            Close
          </button> 
        </div>
      </template>
    </modal>
     <!-- GA remove Modal -->

      <!-- GA Disable Success Modal -->
      <modal ref="successfullyModalGARemove" class="ss-modal">
      <template v-slot:header>
        <h2 style="color: black">
          Google Authenticator <br />
          Successfully Disable
        </h2>
      </template>

      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="successGAModalGAModal" class="loginbtn">Continue</button>
        </div>
      </template>
    </modal>
     <!-- GA Disable Success Modal -->

    
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
      stage_code:"",

      btnShowEmailMobGARemove:true,
      EmailWrongGARemove:false,
      EmailuccessGARemove:false,
      emailCodeGARemove:"",

      gaCodeGARemove:"",
      GAWrong:false,
      GASuccess:false,
      token:"",

      mobileCodeMobGARemove:"",
      mobileSuccessGARemove:false,
      mobileWrongGARemove:false,
      btnShowMobileGARemove:true,



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

    async openmodaldisableGA(){
       this.$refs.disableGAModal.openModal();
       this.clearStatus()
       this.getQRToken()
    },
    async sendEmailVerificationCodeGARemove() {
     
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };

      axios
        .get("https://dapi.exus.live/api/twofa/email/code", {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive);
          this.$toast.show("Successfully  Send Email Verification Code", {type: "success", position: "top"});
    
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
     async emailCodeSubmitGARemove() {
      this.EmailWrongGARemove = true;
      this.btnShowEmailMobGARemove = false;
      if (this.emailCodeGARemove.length == 6) {
        var data = {
          token: this.emailCodeGARemove,
          status: "",
          stage_code:this.stage_code,
          stage: 1,
        };
        let hed = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "X-LDX-Inspira-Access-Token"
            )}`,
            "Content-Type": "application/json",
          },
        };

        let response = await this.axios
          .post("https://dapi.exus.live/api/twofa/email/status", data, hed)
          .then((res) => {
            this.EmailuccessGARemove = true;
            this.EmailWrongGARemove = false;
            console.log(res);
            console.log(response);
            console.log(this.stage_code)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
     async getQRToken(){
       const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };
      axios
        .get("https://dapi.exus.live/api/twofa/generate/ga/qr", {
          headers: headers,
        })
        .then((response) => {
          console.log(response);

          this.token = response.data.secretdata.split("otpauth://totp/Inspira?secret=");
          console.log(this.token)
         
        })
        .catch(function (error) {
          console.log(error);
          
        });
    },
     async submitGACodeGARemove() {
      this.GAWrong = true;
      if (this.gaCodeGARemove.length == 6) {
        let hed = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "X-LDX-Inspira-Access-Token"
            )}`,
            "Content-Type": "application/json",
          },
        };

        let response = await this.axios
          .post(
            "https://dapi.exus.live/api/twofa/ga/status",
            {
              secret: this.token[1],
              token: this.gaCodeGARemove,
              status: "disable",
              stage_code:this.stage_code,
              stage: 1,
            },
            hed
          )
          .then((res) => {
            this.GASuccess = true;
            this.GAWrong = false;
            console.log(res);
            console.log(response);
            console.log(this.stage_code)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

   async optionupdate(){
     var data = {
         status: "disable",
         stage_code:this.stage_code,
         option: "ga"
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/option/status",
        data,
        hed
      );
      console.log(response);
      console.log(this.stage_code)
      
    
 },

 async GARemoveContinue (){
  this.$refs.disableGAModal.closeModal();
  this.$refs.successfullyModalGARemove.openModal();
  this.optionupdate()
 },

     async successGAModalGAModal(){
      var data = {
        status: "disable",
        stage_code:this.stage_code,
      };

      let hed = { headers: { Authorization: `Bearer ${localStorage.getItem(  "X-LDX-Inspira-Access-Token")}`, "Content-Type": "application/json",  }, };
      let response = await this.axios
        .post("https://dapi.exus.live/api/twofa/status", data, hed)
        .then((res) => {
          console.log(res);
          console.log(response);
          console.log(this.stage_code)
        })
        .catch(function (error) {
          console.log(error);
        });

      this.$refs.successfullyModalGARemove.closeModal();
      this.$router.go();
    },

      async sendMobileCodeGARemove() {
      var data = {
        mobile: this.phone_number,
      };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "X-LDX-Inspira-Access-Token"
          )}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/sms/code",
        data,
        hed
      );
      console.log(response);
       this.$toast.show("Successfully  Send Mobile Verification Code", {type: "success", position: "top"});
    },
  async mobileCodeSubmitGARemove() {
     this.btnShowMobileGARemove = false;
      this.mobileWrongGARemove = true;

      if (this.mobileCodeMobGARemove.length == 6) {
        var data = {
          mobile: this.phone_number,
          code: this.mobileCodeMobGARemove,
          status: "",
          stage_code:this.stage_code,
          stage: 1,
        };

        let hed = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "X-LDX-Inspira-Access-Token"
            )}`,
            "Content-Type": "application/json",
          },
        };

        let response = await this.axios
          .post("https://dapi.exus.live/api/twofa/sms/status", data, hed)
          .then((res) => {
            console.log(res);
            console.log(response);
            this.mobileSuccessGARemove= true;
            this.mobileWrongGARemove = false;
            console.log(this.stage_code)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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

  .gaRemoveContinueBtn{
    margin-top: 40px;
  }
</style>