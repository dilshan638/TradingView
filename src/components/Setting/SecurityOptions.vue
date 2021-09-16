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
                      <button class="btn btn-outline" v-show="fa_mobile_status =='true'" @click="smsVerModalOne">Remove</button>
                       <button class="btn btn-primary"  v-show="fa_mobile_status =='false' || fa_mobile_status ==null" @click="smsVerModalOne">Activate</button>
                       
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
              <div class="card profile-card mb-4">
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


   <!-- SMS Modal One -->
        <modal ref="smsModalOne" class="forgot-modal border50">
      <template v-slot:header>
        <h2 style="color: black">SMS Verification</h2>
      </template>
      <template v-slot:body>
        <div class="tab-content modal-tab">
          <div
            class="tab-pane active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <h5 style="color: black">Enter your Mobile no</h5>
            <div class="form-group pos-rel">
              <vue-tel-input
                class="form-control"
                :valid-characters-only="true"
                aria-autocomplete="none"
                v-model="mobileno"
                v-on:validate="countryChanged"
                :inputOptions="options"
                :dropdownOptions="options2"
              >
              </vue-tel-input>
            </div>

            <div class="modal-buttons">
              <button class="mb-3" @click="smsModalOneNext" >Next</button>
              <button
                class="second-btn mb-3"
                @click="$refs.smsModalOne.closeModal()"
              >
                Cancel
              </button>
            </div>
          </div>

          <div
            class="tab-pane"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            Coming soon
          </div>
        </div>
      </template>
    </modal>
    <!-- SMS Modal One -->

     <!-- SMS (2nd Step) verification modal -->
    <modal ref="smsSeondModal" class="modal2-modal border50 no-modal-body-b">
      <template v-slot:header>
        <h2 class="Security-Verification">Security Verification</h2>
      </template>
      <template v-slot:body>
        <div class="form-group pos-rel sec-row mb-3 mt-3">
          <p class="sub-text">
            Please enter the 6 Digit code that we have sent a to +9471****89
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Mobile verification code"
               v-model="mobileCodeMob"
              @input="mobileCodeSubmitMob"
               :disabled="mobileSuccessMob == true"
              
            />

            <div class="input-group-append">
              <button
                v-if="btnShowMobileMob"
                class="btn btn-outline-secondary"
                style="margin-top: 0rem; margin-left: 0rem"
                type="button"
                @click="sendMobileCodeMobile"
              >
                Send
              </button>
                  <img
                    v-if="mobileSuccessMob && !mobileWrongMob"
                    src="images/icons/correct.png"
                    class="pos-img error-imgs"
                  />
                  <img
                    v-if="mobileWrongMob"
                    src="images/icons/ic_fail@3x.webp"
                    class="pos-img"
                  />
            </div>
          </div>
          <!-- <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div> -->
          
          <p  class="sub-text text-right" v-if="!mobileSuccessMob " >
            Didn't received?
            <a class="link" @click="sendMobileCodeMobile">Resend</a>
          </p>
        </div>
        <div
          v-if="fa_email_status == 'true'"
          class="form-group pos-rel sec-row"
        >
          <p class="sub-text">
            Please enter the 6 Digit code that we have sent a to dil*****@.com
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Email verification code"
              v-model="emailCodeMob"
              @input="emailCodeSubmitMob"
                :disabled="emailSuccessMob == true"
              
            />
            <div class="input-group-append">
              <button
               v-if="btnShowEmailMob"
                class="btn btn-outline-secondary"
                style="margin-top: 0rem; margin-left: 0rem"
                type="button"
                 @click="sendEmailVerificationCode"
                
              >
                Send
              </button>
                  <img  v-if="emailSuccessMob && !emailWrongMob"  src="images/icons/correct.png" class="pos-img error-imgs"/>
                  <img v-if="emailWrongMob" src="images/icons/ic_fail@3x.webp" class="pos-img"/>
            </div>
          </div>
          <!-- <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div> -->
          <p class="sub-text text-right" v-if="!emailSuccessMob">
            Didn't received?
            <a class="link" @click="sendEmailVerificationCode" >Resend</a>
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
        
          <!-- Submit button -->
           <button
          :disabled="mobileSuccessMob == false || emailSuccessMob==false"
           class="mb-3"   @click="submitSmsModal"
           >
      Submit 
    </button>

       <button
            class="second-btn mb-3" @click="$refs.smsSeondModal.closeModal()">
            Close
          </button>
        </div>
      </template>
    </modal>
    <!-- End Sms (2nd step) verification modal -->


    <!-- GA Enable Wizard -->
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

         <div class="form-group pos-rel sec-row mb-3 mt-3" v-if="fa_mobile_status == 'true'">
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
         

           <button v-show="  fa_mobile_status == 'false'"
                   :disabled="GASuccess == false || EmailuccessGARemove == false"
                  class="loginbtn btnGA" @click="GARemoveContinue"  >
               Continue
          </button>

           <button v-show="  fa_mobile_status == 'true'"
                   :disabled="GASuccess == false || EmailuccessGARemove == false || mobileSuccessGARemove == false"
                  class="loginbtn btnGA" @click="GARemoveContinue"  >
               Continue
          </button>

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


 <!--SUCCESS Sms modal -->
    <modal ref="smsSuccessModal" class="s-modal">
      <template v-slot:header>
        <h2 style="color: black">Successfully Updated</h2>
      </template>
      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="mobileSucceccModalMob" class="loginbtn">Continue</button>
        </div>
      </template>
    </modal>

    <!-- End SUCCESS Sms modal -->

  
    
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
      mobileno:"",


      mobileCodeMob:"",
      mobileSuccessMob: false,
      emailWrongMob: false,
      mobileWrongMob: false,

      btnShowEmailMob: true,
      btnShowMobileMob: true,

      emailCodeMob:"",
      mobileOneTimeStatusSend:"",
      mobileStatus:"",


    };
  },

  methods: {
    countryChanged(phoneObject) {
      this.mobileno = phoneObject.number;
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

    async smsVerModalOne(){
         this.clearStatus()
         this.$refs.smsModalOne.openModal();
    },

    async smsModalOneNext(){
      this.$refs.smsModalOne.closeModal();
      this.$refs.smsSeondModal.openModal();
    },
     async sendMobileCodeMobile() {
      
      var data = {
        mobile: this.mobileno,
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
       this.$toast.show("Successfully  Send Mobile Verification Code", {type: "success", position: "top"});
      console.log(response);
     
    },

      async mobileCodeSubmitMob() {
      this.btnShowMobileMob = false;
      this.mobileWrongMob = true;

      if (this.mobileCodeMob.length == 6) {
        if (this.fa_mobile_status == "true") {
          this.mobileStatus = "disable";
        } else {
          this.mobileStatus = "enable";
        }
        var data = {
          mobile: this.mobileno,
          code: this.mobileCodeMob,
          status: this.mobileStatus,
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
            this.mobileSuccessMob = true;
            this.mobileWrongMob = false;
            console.log(this.stage_code)
          })
          .catch(function (error) {
            console.log(error);
            
          });
      }
    },

     async sendEmailVerificationCode() {
     
    
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
     async emailCodeSubmitMob() {
      this.btnShowEmailMob = false;
      this.emailWrongMob = true;
      if (this.emailCodeMob.length == 6) {
        var data = {
          token: this.emailCodeMob,
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
            this.emailWrongMob = false;
            this.emailSuccessMob = true;
            console.log(res);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    async submitSmsModal(){

       this.$refs.smsSeondModal.closeModal();
       this.$refs.smsSuccessModal.openModal();

      if (this.fa_mobile_status == "true") {
          this.mobileStatus = "disable";
        } else {
          this.mobileStatus = "enable";
        }
      var data = {
        
         status: this.mobileStatus,
         stage_code:this.stage_code,
         option: "mobile"
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
      ).then((res) => {
          console.log(res);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
     
    },

    async mobileSucceccModalMob(){
     
       if (this.fa_mobile_status == "true") {
        this.mobileOneTimeStatusSend = "disable";
      } else {
        this.mobileOneTimeStatusSend = "enable";
      }
      var data = {
        status: this.mobileOneTimeStatusSend,
        stage_code:this.stage_code,
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
        .post("https://dapi.exus.live/api/twofa/status", data, hed)
        .then((res) => {
          console.log(res);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
       this.$refs.smsSuccessModal.closeModal();
      this.$router.go();
    }


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
    float: left;
    width: 100%;
    margin-top: 70px;
  }
</style>