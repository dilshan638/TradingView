<template>
  <default-layout>
    <div class="row">
      <div class="col-md-12">
        <div class="card table-card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-4">
                <h2>Security</h2>
              </div>
              <div class="col-md-8">
                <div class="btn-status">
                  <i class="ri-checkbox-circle-fill"></i> 2FA Enabled
                </div>
                <div class="btn-status">
                  <i class="ri-checkbox-circle-fill"></i> Account Verified
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <p class="mb-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor
                </p>
                <p>Security Options</p>
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-4">
                <h5>Email Verification</h5>
                <span
                  >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam</span
                >
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-7">
                <button
                  v-if="fa_email_status == 'true'"
                  class="btn"
                  @click="sendEmailCodeBTN"
                >
                  On
                </button>

                <button
                  v-else
                  class="btn btn-outline"
                  @click="sendEmailCodeBTN"
                >
                  Disabled
                </button>
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-4">
                <h5>SMS Verification</h5>
                <span
                  >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam</span
                >
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-7">
                <button
                  v-if="fa_mobile_status == 'true'"
                  class="btn"
                  @click="SecurityTwo"
                >
                  ON
                </button>
                <button v-else class="btn btn-outline" @click="SecurityTwo">
                  Disabled
                </button>
              </div>
            </div>
            <div class="row sec-row">
              <div class="col-md-4">
                <h5>Google Authenticator</h5>
                <span
                  >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam</span
                >
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-7">
                <button
                  v-if="fa_ga_status == 'true'"
                  class="btn"
                  @click="GAuthOne"
                >
                  ON
                </button>
                <button v-else class="btn btn-outline" @click="GAuthOne">
                  Disabled
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
          <button class="mb-3" @click="emailSubmitButton">Next</button>
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
          <p  class="sub-text text-right" v-if="!mobileSuccessMob">
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
                  <img
                    v-if="emailSuccessMob && !emailWrongMob"
                    src="images/icons/correct.png"
                    class="pos-img error-imgs"
                  />
                  <img
                    v-if="emailWrongMob"
                    src="images/icons/ic_fail@3x.webp"
                    class="pos-img"
                  />
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
          <button class="mb-3" @click="showsuccessmodal">
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
          Google Authenticator <br />
          Successfully Enabled
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
        <h2 style="color: black">SMS Verification Success</h2>
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
      this.$refs.securitytwo.openModal();
    },

   async sendEmailCodeBTN(){
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
      this.$refs.securityGauthone.openModal();
    },

    async openMobileAndEmailModal() {
      this.$refs.secruritymodal2.openModal();
    },

    async sendMobileCodeMobile() {
      console.log(this.state.mobileno);
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
      console.log(response);
    },
    async sendMobileCode() {
      this.$refs.securitytwo.closeModal();
      this.$refs.secruritymodal2.openModal();
      this.getUserMobile();
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
      this.$refs.securityfour.openModal()
      this.$refs.secruritymodal2.closeModal()
    }
  },
  mounted() {
    this.status();
    this.getUseremail();
    
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
</style>