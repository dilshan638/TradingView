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
                <button class="btn btn-outline" @click="SecurityThree">
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
             
        <vue-tel-input class="form-control" :valid-characters-only="true" aria-autocomplete="none" v-model="state.mobileno" v-on:validate="countryChanged" :inputOptions="options" :dropdownOptions="options2"> </vue-tel-input>
                                                  
            </div>

            <div class="modal-buttons">
              <button class="mb-3" @click="sendMobileCode">Send Now</button>
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
              <button class="mb-3" @click="sendMobileCode">Send Now</button>
              <button
                class="second-btn mb-3"
                @click="$refs.securitytwo.closeModal()"
              >
                Cancel
              </button>
            </div>
      </template>
    </modal>

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

    <modal ref="securityGauthone" class="wizard-modal">
      <template v-slot:header> </template>

      <template v-slot:body>
        <wizard />
        <!-- <div class="form-group">
                    <div class="eye-area">
                    <qrcode-vue :value="value" :size="size" level="H" class="cls" />
                    </div>
                </div> -->
      </template>

      <template v-slot:footer> </template>
    </modal>

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
          <button
            @click="Continue"
            class="loginbtn"
          >
            Continue
          </button>
        </div>
      </template>
    </modal>

       <modal ref="mobileAndEmailCodeModal">
      <template v-slot:header>
        <h2 style="color: black">
          Security Verification
        </h2>
      </template>

      <template v-slot:body>
          <input placeholder="sad"/>
          <input placeholder="sad"/>
      </template>
      <template v-slot:footer>
         <div class="modal-buttons">
              <button class="mb-3" @click="sendMobileCode">Submit</button>
              <button
                class="second-btn mb-3"
                @click="$refs.mobileAndEmailCodeModal.closeModal()"
              >
                Cancel
              </button>
            </div>
      </template>
    </modal>

        <modal ref="successfullyModalSMS">
      <template v-slot:header>
        <h2 style="color: black">
          SMS Security Verification
        </h2>
      </template>

      <template v-slot:body>
        <img class="correct" src="images/icons/correct.png" />
      </template>
      <template v-slot:footer>
        <div>
          <button
            @click="ContinueSMS"
            class="loginbtn"
          >
            Continue
          </button>
        </div>
      </template>
    </modal>
  </default-layout>
</template>

<script>
import DefaultLayout from "../layout/DefaultLayout.vue";
import Modal from "../components/Modal/Modal.vue";
import Wizard from "../components/SecuritySetting/Wizard.vue";
//import QrcodeVue from "qrcode.vue";
import useValidate from "@vuelidate/core";
import {
  required,
  numeric,
  minLength,
  // sameAs,
  // maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "order",
  components: {
    DefaultLayout,
    Modal,
    Wizard,
    //QrcodeVue
    //   OpenOrders
  },
  setup() {
    const state = reactive({
      mobileno: "",
      mobilecode: "",
      emailCode: "",
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
      value: "otpauth://totp/SupremeCrypX?secret=ZZZQPGOCPUYLJDMP",
      size: 300,

       options: { 
                 placeholder: "Phone Number",
                 autoFormat:true,
                 mode:"international",
                 maxlength:12,
                 validCharactersOnly:true
                //type:Number,
                // tabindex:Number
            },
            options2:{
                showDialCodeInList:true,
                showDialCodeInSelection:true,
                showFlags:true,
                autofocus:true

            }
    };
  },
  methods: {

     countryChanged(phoneObject) {
         this.state.mobileno = phoneObject.number
        },
    async SecurityTwo() {
      this.$refs.securitytwo.openModal();
    },

    async SecurityThree() {
      this.$refs.securitythree.openModal();

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };

      axios
        .get("https://dapi.exus.live/api/twofa/email/code", {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
    async resend() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
      };

      axios
        .get("https://dapi.exus.live/api/twofa/email/code", {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },

    async SecurityFour() {
      this.$refs.securityfour.openModal();
    },
    async GAuthOne() {
      this.$refs.securityGauthone.openModal();
    },

    async sendMobileCode() {
         var data = {
          mobile:this.state.mobileno,
         
      };

     let hed = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/sms/code",
        data,
        hed
      );
      console.log(response)
        this.$refs.mobileAndEmailCodeModal.openModal();
    },

    async emailCodeSubmit() {
           
         var data = {
          token:this.state.emailCode,
          status: "enable",
          stage: 1
      };

     let hed = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/email/status",
        data,
        hed
      );
      console.log(response)
      this.$refs.successfullyModal.openModal();
    },

    async Continue(){
   
          var data = {
          token:this.state.emailCode,
          status: "enable",
          stage: 1
     };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/email/status",
       data,
        hed
      );
      console.log(response)
       this.$refs.successfullyModal.closeModal()
    },

   async ContinueSMS(){

         var data = {
          mobile:this.state.emailCode,
          code:"795078",
          status: "enable",
          stage: 1
     };

      let hed = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token")}`,
          "Content-Type": "application/json",
        },
      };
      let response = await this.axios.post(
        "https://dapi.exus.live/api/twofa/email/status",
       data,
        hed
      );
      console.log(response)

       this.$refs.successfullyModalSMS.closeModal()
    }
      
  },

  mounted(){
    
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/SecuritySetting/SecuritySetting";


</style>