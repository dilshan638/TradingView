<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card table-card">
          <div class="card-header add-border">
            <div class="row">
              <div class="col-md-4">
                <h2>Security</h2>
              </div>
              <div class="col-md-8">
                
                <div class="btn-status">
                  <i class="ri-checkbox-circle-fill"></i>Account Verified
                </div>
              </div>
            </div>
          </div>
          <div class="card-body sec-option">
            <div class="row">
              <div class="col-md-12">
                <p>Security Options</p>
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-2">
                <h5>Email Verification</h5>
              </div>
              <div class="col-md-2">
                <!-- <button
                  v-if="fa_email_status == 'true'"
                  class="btn"
                  @click="sendEmailCodeBTN"
                >
                  Remove
                </button> -->

                <button
                 class="btn btn-outline"
                 
                >
                  Active
                </button>                
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-2">
                <h5>SMS Verification</h5>
              </div>
              <div class="col-md-2">
                <button
                  v-if="fa_mobile_status == 'true'"
                  class="btn"
                  @click="SecurityTwo"
                >
                  Remove
                </button>
                <button v-else class="btn btn-outline" @click="SecurityTwo">
                  Active
                </button>
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-2">
                <h5>Google Authenticator</h5>
              </div>
              <div class="col-md-2">
                <button
                  v-if="fa_ga_status == 'true'"
                  class="btn"
                  @click="GaRemoveModal"
                >
                  Remove
                </button>
                <button v-else class="btn btn-outline" @click="GAuthOne">
                  Active
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Email Verification modal -->
    <modal ref="securitythree" class="sec-ver-modal border50">
      <template v-slot:header>
        <h2 style="color: black">Security Verification</h2>
      </template>

      <template v-slot:body>
        <p style="color: #000 !important">
          Enter the 6 Digit code sent to <br />
          your registered email on INSPIRA
        </p>
        
        <b class="email-size">{{ emailmask }}</b>
        <div class="form-group mb-0">
          <div class="eye-area">
            <input
              v-model="state.emailCode"
              class="form-control"
              placeholder="Email verification code"
              @input="emailCodeSubmit"

              :disabled="emaileSuccessemail == true"
            />
            <img
              class="pos-img"
              v-if="emaileSuccessemail && !emailWrongEmail"
              src="images/icons/correct.png"
            />
            <img
              class="pos-img"
              v-if="emailWrongEmail"
              src="images/icons/ic_fail@3x.webp"
            />
          </div>

          <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div>
          
          <span class="resend-area text-right resend-link" v-if="timerCount == 0">Didn't received?
            <a class="link" @click="sendEmailVerificationCode">Resend</a></span
          >
        </div>
      </template>

      <template v-slot:footer>
        <div class="modal-buttons">
          <button class="mb-3"  v-if="emaileSuccessemail"  @click="emailSubmitButton">Next</button>
          <button
            class="second-btn mb-3"
            @click="$refs.securitythree.closeModal()"
          >
            Cancel
          </button>
        </div>
      </template>
    </modal>
    <!-- End Email Verification modal -->

    <!--SMS Verification modal -->

    <modal ref="securitytwo" class="forgot-modal border50">
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
                v-model="state.mobileno"
                v-on:validate="countryChanged"
                :inputOptions="options"
                :dropdownOptions="options2"
              >
              </vue-tel-input>
            </div>

            <div class="modal-buttons">
              <button class="mb-3" @click="sendMobileCode">Next</button>
              <button
                class="second-btn mb-3"
                @click="$refs.securitytwo.closeModal()"
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
    <!-- End SMS Verification modal -->

    <!-- SMS (2nd Step) verification modal -->
    <modal ref="secruritymodal2" class="modal2-modal border50 no-modal-body-b">
      <template v-slot:header>
        <h2 class="Security-Verification">Security Verification</h2>
      </template>
      <template v-slot:body>
        <div class="form-group pos-rel sec-row mb-3 mt-3">
          <p class="sub-text">
            Please enter the 6 Digit code that we have sent a to {{usermobilenumber}}
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Mobile verification code"
              v-model="state.mobileCodeMob"
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
          <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div>
          <p  class="sub-text text-right" v-if="!mobileSuccessMob && timerCount==0" >
            Didn't received?
            <a class="link" @click="sendMobileCodeMobile">Resend</a>
          </p>
        </div>
        <div
          v-if="fa_email_status == 'true'"
          class="form-group pos-rel sec-row"
        >
          <p class="sub-text">
            Please enter the 6 Digit code that we have sent a to {{ emailmask }}
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Email verification code"
              v-model="state.emailCodeMob"
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
            <a class="link" @click="sendEmailVerificationCode">Resend</a>
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3"  v-if="mobileSuccessMob" @click="showsuccessmodal">
            Submit
          </button>
          <button
            class="second-btn mb-3" @click="$refs.secruritymodal2.closeModal()">
            Close
          </button>
        </div>
      </template>
    </modal>
    <!-- End Sms (2nd step) verification modal -->

    <!--SUCCESS Email modal -->
    <modal ref="successfullyModal" class="border50">
      <template v-slot:header>
        <h2 style="color: black">
          Successfully Updated
        </h2>
      </template>

      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="Continue" class="loginbtn">Continue</button>
        </div>
      </template>
    </modal>

    <!--End SUCCESS Email modal -->

    <!--SUCCESS Sms modal -->
    <modal ref="securityfour" class="s-modal">
      <template v-slot:header>
        <h2 style="color: black">Successfully Updated</h2>
      </template>
      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="mobileSucceccModal" class="loginbtn">Continue</button>
        </div>
      </template>
    </modal>

    <!-- End SUCCESS Sms modal -->

    <modal ref="securityGauthone" class="wizard-modal">
      <template v-slot:header> </template>
      <template v-slot:body>
        <wizard />
      </template>
      <template v-slot:footer> </template>
    </modal>


     <!-- GA remove Modal -->
      <modal ref="GaRemoveModal" class=" modal2-modal border50 no-modal-body-b">
      <template v-slot:header>
        <h2 style="color: black">
        Security Verification
        </h2>
      </template>

      <template v-slot:body>

         <div class="form-group pos-rel sec-row mb-3 mt-3" v-if="fa_mobile_status == 'true'">
         <p class="sub-text">
        Please enter the 6 Digit code that we have sent a to {{usermobilenumber}}
       
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
        v-if="!mobileSuccessGARemove && timerCount == 0" 
        
      >
        Didn't received?
        <a class="link" @click="sendMobileCodeGARemove">Resend</a>
      </p>
        </div>

    <div class="form-group pos-rel sec-row txtEmail"  v-if="fa_email_status == 'true'">
      <p class="sub-text">
        Please enter the 6 Digit code that we have sent a to {{ emailmask }}
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
            @click="sendEmailVerificationCode"
          >
            Send
          </button>
          <img  v-if="EmailuccessGARemove && !EmailWrongGARemove" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img   v-if="EmailWrongGARemove" src="images/icons/ic_fail@3x.webp" class="pos-img" />
        </div>
      </div>

   <!-- <div class="time-socket" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div> -->
      <p class="sub-text text-right">
        Didn't received?
        <a class="link" @click="sendEmailVerificationCode">Resend</a>
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
      <template v-slot:footer>
        <div >
          <button v-if="GASuccess" @click="continueGARemove" class="loginbtn btnGA">Continue</button>
        </div>
      </template>
    </modal>
     <!-- GA remove Modal -->
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
     <!-- GA Success Modal -->
  </default-layout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout.vue";
import Modal from "../components/Modal/Modal.vue";
import Wizard from "../components/SecuritySetting/Wizard.vue";
import useValidate from "@vuelidate/core";
import { required, numeric, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "order",
  components: {
    DefaultLayout,
    Modal,
    Wizard
  },
  setup() {
    const state = reactive({
      mobileno: "",
      mobilecode: "",
      emailCode: "",
      emailCodeMob: "",
      mobileCodeMob: "",
    });

    const rules = computed(() => {
      return {
        mobileno: {
          required,
          numeric,
          minLength: minLength(10),
        },
        mobilecode: {
          required,
          numeric,
        },
      };
    });

    const v$ = useValidate(rules, state);
    return { state, v$ };
  },
  data() {
    return {

      timerCount: 60,
      showPassword: false,

      fa_email_status: "",
      fa_ga_status: "",
      fa_mobile_status: "",
      emailmask: "",

      emailStatus: "",
      mobileStatus: "",
      usermobilenumber:"",
     

      mobileCodeMobGARemove:"",

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
      replaced: "",
      mobileSuccess: false,
      emailSuccess: false,
      emailSuccessMob: false,
      mobileSuccessMob: false,
      emailWrongMob: false,
      mobileWrongMob: false,

      btnShowEmailMob: true,
      btnShowMobileMob: true,

      emaileSuccessemail: false,
      emailWrongEmail: false,
      emailOneTimeStatusSend: "",
      mobileOneTimeStatusSend: "",
      phone_number:"",

      mobileSuccessGARemove:false,
      mobileWrongGARemove:false,
      btnShowMobileGARemove:true,

      btnShowEmailMobGARemove:true,
      EmailWrongGARemove:false,
      EmailuccessGARemove:false,
      emailCodeGARemove:"",

      gaCodeGARemove:"",
      GAWrong:false,
      GASuccess:false,
      token:"",

    };
  },
  methods: {
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
    },
    async getUseremail() {
        this.emailmask = localStorage.getItem("emailmask");
        let hide = this.emailmask.split("@")[0].length - 4;//<-- number of characters to hide
        var r = new RegExp(".{"+hide+"}@", "g")
        this.emailmask = this.emailmask.replace(r, "***@" );
    },
    async getUserMobile() {
      var string = this.state.mobileno
      localStorage.setItem("usermobileinput", string);
      localStorage.getItem("usermobileinput");
      var mobiledata = localStorage.getItem("usermobileinput");
      this.usermobilenumber = mobiledata.slice(0, 2) + mobiledata.slice(2).replace(/.(?=...)/g, '*');
     
    },

 

    countryChanged(phoneObject) {
      this.state.mobileno = phoneObject.number;
    },
    async SecurityTwo() {
       this.clearStatus()
      this.$refs.securitytwo.openModal();
    },

   async sendEmailCodeBTN(){
      this.clearStatus()
      this.$refs.securitythree.openModal();

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
        })
        .catch(function (error) {
          console.log(error);
        });
   },
    async sendEmailVerificationCode() {
     
    this.$toast.show("Successfully  Send Email Verification Code", {type: "success", position: "top"});
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
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async SecurityFour() {
      this.$refs.securityfour.openModal();
    },
    async GAuthOne() {
       this.clearStatus()
      this.$refs.securityGauthone.openModal();
      
    },

    async openMobileAndEmailModal() {
      this.$refs.secruritymodal2.openModal();
    },

    async sendMobileCodeMobile() {
      
      var data = {
        mobile: this.state.mobileno,
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
    async sendMobileCode() {
      this.getUserMobile()
      this.$refs.securitytwo.closeModal();
     this.$refs.secruritymodal2.openModal();
    },

    async emailCodeSubmit() { 
      this.emailWrongEmail = true;

      if (this.state.emailCode.length == 6) {
        if (this.fa_email_status == "true") {
          this.emailStatus = "disable";
        } else {
          this.emailStatus = "enable";
        }
        var data = {
          token: this.state.emailCode,
          status: this.emailStatus,
          "stage_code":localStorage.getItem('clearStatusCode'),
           stage: 1,
          
          };
        console.log(this.emailStatus);

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
            console.log(res);
            console.log(response);
            this.emailWrongEmail = false;
            this.emaileSuccessemail = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    async emailSubmitButton() {
      this.$refs.securitythree.closeModal();
      this.$refs.successfullyModal.openModal();
    },
    async emailCodeSubmitMob() {
      this.btnShowEmailMob = false;
      this.emailWrongMob = true;
      if (this.state.emailCodeMob.length == 6) {
        var data = {
          token: this.state.emailCodeMob,
          status: "",
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

    async Continue() {
      if (this.fa_email_status == "true") {
        this.emailOneTimeStatusSend = "disable";
      } else {
        this.emailOneTimeStatusSend = "enable";
      }
      var data = {
        status: this.emailOneTimeStatusSend,
        stage_code:localStorage.getItem('clearStatusCode'),
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
      this.$refs.successfullyModal.closeModal();
      this.$router.go();
    },

    async mobileSucceccModal() {
      if (this.fa_mobile_status == "true") {
        this.mobileOneTimeStatusSend = "disable";
      } else {
        this.mobileOneTimeStatusSend = "enable";
      }
      var data = {
        status: this.mobileOneTimeStatusSend,
         "stage_code":localStorage.getItem('clearStatusCode')
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
      this.$refs.securityfour.closeModal();
      this.$router.go();
    },

    async mobileCodeSubmitMob() {
      this.btnShowMobileMob = false;
      this.mobileWrongMob = true;

      if (this.state.mobileCodeMob.length == 6) {
        if (this.fa_mobile_status == "true") {
          this.mobileStatus = "disable";
        } else {
          this.mobileStatus = "enable";
        }
        var data = {
          mobile: this.state.mobileno,
          code: this.state.mobileCodeMob,
          status: this.mobileStatus,
          "stage_code":localStorage.getItem('clearStatusCode'),
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
          })
          .catch(function (error) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          });
      }
    },
    async showsuccessmodal() {
       this.$refs.secruritymodal2.closeModal()
      this.$refs.securityfour.openModal()
     
     
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
             localStorage.setItem('clearStatusCode',res.data.code)
             console.log(localStorage.getItem('clearStatusCode'))
            

          })
          .catch(function (error) {
            console.log(error.response.data);
          });
    
    },

    async GaRemoveModal(){
         this.$refs.GaRemoveModal.openModal()
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
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
     async emailCodeSubmitGARemove() {
      this.EmailWrongGARemove = true;
      this.btnShowEmailMobGARemove = false;
      if (this.emailCodeGARemove.length == 6) {
        var data = {
          token: this.emailCodeGARemove,
          status: "",
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
              "stage_code":localStorage.getItem('clearStatusCode'),
              stage: 1,
            },
            hed
          )
          .then((res) => {
            this.GASuccess = true;
            this.GAWrong = false;
            console.log(res);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    async continueGARemove(){
      this.getUserMobileGA()
      this.$refs.GaRemoveModal.closeModal();
     this.$refs.successfullyModalGARemove.openModal();
    },

    async successGAModalGAModal(){
      var data = {
        status: "disable",
          "stage_code":localStorage.getItem('clearStatusCode')
      };

      let hed = { headers: { Authorization: `Bearer ${localStorage.getItem(  "X-LDX-Inspira-Access-Token")}`, "Content-Type": "application/json",  }, };
      let response = await this.axios
        .post("https://dapi.exus.live/api/twofa/status", data, hed)
        .then((res) => {
          console.log(res);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.$refs.successfullyModalGARemove.closeModal();
      this.$router.go();
    }
  },


  mounted() {
    this.status();
   this.getUseremail();
   this.getQRToken()
  
   
    
  },
  watch: {

    timerCount: {
        handler(value) {

            if (value > 0) {
                setTimeout(() => {
                    this.timerCount--;
                }, 1000);
            }

        },
        immediate: true // This ensures the watcher is triggered upon creation
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/SecuritySetting/SecuritySetting";

.btnGA{
  margin-top: 30px;
}
.txtEmail{
  margin-top: -15px;
}
</style>