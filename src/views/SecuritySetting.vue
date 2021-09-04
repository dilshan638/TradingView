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
                  class="btn btn-outline"
                  @click="sendEmailVerificationCode"
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
                <button class="btn" @click="SecurityTwo">ON</button>
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
                <button class="btn" @click="GAuthOne">ON</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Email Verification modal -->
    <modal ref="securitythree">
      <template v-slot:header>
        <h2 style="color: black">Security Verification</h2>
      </template>

      <template v-slot:body>
        <p style="color: #000 !important">
          We have sent a 6 Digit code to <br />
          following Mobile No
        </p>

        <b>ab**@**.com</b>
        <span class="resend-area"
          >Didn't received? <a class="link" @click="resend">Resend</a></span
        >

        <div class="form-group mb-4">
          <div class="eye-area">
            <input
              v-model="state.emailCode"
              class="form-control"
              placeholder="Email verification code  "
            />
          </div>
        </div>

        <div class="form-group">
          <div class="eye-area"></div>
        </div>
      </template>

      <template v-slot:footer>
        <div class="modal-buttons">
          <button class="mb-3" @click="emailCodeSubmit">Send Now</button>
          <button
            class="second-btn mb-3"
            @click="$refs.securitytwo.closeModal()"
          >
            Cancel
          </button>
        </div>
      </template>
    </modal>
    <!-- End Email Verification modal -->

    <!--SMS Verification modal -->

    <modal ref="securitytwo" class="forgot-modal">
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
              <button class="mb-3" @click="openMobileAndEmailModal">
                Next
              </button>
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

    <!-- Google Auth verification modal -->
    <modal ref="secruritymodal2" class="modal2-modal border50 no-modal-body-b">
      <template v-slot:header>
        <h2 class="Security-Verification">Security Verification</h2>
      </template>
      <template v-slot:body>
        <div class="form-group pos-rel sec-row mb-3 mt-3">
          <p class="sub-text">
            Please enter the 6 Digit code that we have sent a to +9477***121
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Mobile verification code"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                style="margin-top: 0rem; margin-left: 0rem"
                type="button"
                @click="sendMobileCode"
              >
                Send
              </button>
            </div>
          </div>
          <p class="sub-text text-right">
            Didn't received? <a class="link" @click="sendMobileCode">Resend</a>
          </p>
        </div>
        <div class="form-group pos-rel sec-row">
          <p class="sub-text">
            PPlease enter the 6 Digit code that we have sent a to ab**@**.com
          </p>
          <div class="input-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Email verification code"
              v-model="state.emailCodeMob"
              @input="Test"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                style="margin-top: 0rem; margin-left: 0rem"
                type="button"
                @click="sendEmailVerificationCode"
              >
                Send
              </button>
            </div>
          </div>
          <p class="sub-text text-right">
            Didn't received?
            <a class="link" @click="sendEmailVerificationCode">Resend</a>
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal-buttons Modal-btn">
          <button class="mb-3">Submit</button>
          <button class="second-btn mb-3">Close</button>
        </div>
      </template>
    </modal>
    <!-- End Google Auth verification modal -->


<!--SUCCESS Email modal -->
    <modal ref="successfullyModal">
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
    <modal ref="securityfour">
      <template v-slot:header>
        <h2 style="color: black">SMS Verification Success</h2>
      </template>

      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button @click="$refs.securityfour.closeModal()" class="loginbtn">
            Close
          </button>
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
import {
  required,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "order",
  components: {
    DefaultLayout,
    Modal,
    Wizard,
 
  },
  setup() {
    const state = reactive({
      mobileno: "",
      mobilecode: "",
      emailCode: "",
      emailCodeMob: "",
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
      showPassword: false,

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

      mobileSuccess: false,
      emailSuccess: false,
    };
  },
  methods: {
    countryChanged(phoneObject) {
      this.state.mobileno = phoneObject.number;
    },
    async SecurityTwo() {
      this.$refs.securitytwo.openModal();
    },

    async sendEmailVerificationCode() {
      this.$refs.securitythree.openModal();

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem( "X-LDX-Inspira-Access-Token" )}`, };

      axios.get("https://dapi.exus.live/api/twofa/email/code", {headers: headers,})
        .then((responsive) => {
          console.log(responsive);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async resend() {
       const headers = { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem( "X-LDX-Inspira-Access-Token" )}`, };
    
      axios.get("https://dapi.exus.live/api/twofa/email/code", { headers: headers, })
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

    async sendMobileCode() {
      console.log(this.state.mobileno);
      var data = {
        mobile: this.state.mobileno,
      };

      let hed = {  headers: { Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token"  )}`,  "Content-Type": "application/json",  }, };
      let response = await this.axios.post( "https://dapi.exus.live/api/twofa/sms/code",  data,  hed);
      console.log(response);
    },

    async emailCodeSubmit() {
      var data = {
        token: this.state.emailCode,
        status: "enable",
        stage: 1,
      };
     let hed = {  headers: { Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token"  )}`,  "Content-Type": "application/json",  }, };
    
      let response = await this.axios
        .post("https://dapi.exus.live/api/twofa/email/status", data, hed)
        .then((res) => {
          console.log(res);
          console.log(response);
          this.emailSuccess = true;
        })
        .catch(function (error) {
          console.log(error);
         });

      this.$refs.successfullyModal.openModal();
    },

    async Continue() {
      this.$refs.successfullyModal.closeModal();
    },

    async ContinueSMS() {
      var data = {
        mobile: this.state.emailCode,
        code: "795078",
        status: "enable",
        stage: 1,
      };

       let hed = {  headers: { Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token"  )}`,  "Content-Type": "application/json",  }, };
   
      let response = await this.axios.post("https://dapi.exus.live/api/twofa/email/status",
        data,
        hed
      );
      console.log(response);

      this.$refs.successfullyModalSMS.closeModal();
    },

    async Test() {
      if (this.state.emailCodeMob.length == 6) {
        alert("length 6");
      }
    },
  },
  mounted() {
   
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/SecuritySetting/SecuritySetting";
</style>