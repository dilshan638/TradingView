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
                            <p class="mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
                            <p>Security Options</p>               
                        </div>
                    </div>
                    <div class="row sec-row">
                        <div class="col-md-4">
                            <h5>Email Verification</h5>
                            <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</span>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-7">
                            <button class="btn btn-outline" @click="SecurityThree">Disabled</button>
                        </div>
                    </div>
                    <div class="row sec-row">
                        <div class="col-md-4">
                            <h5>SMS Verification</h5>
                            <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</span>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-7">
                            <button class="btn" @click="SecurityTwo">ON</button>
                        </div>
                    </div>      
                    <div class="row sec-row">
                        <div class="col-md-4">
                            <h5>Google Authenticator</h5>
                            <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam</span>
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
                        <input
                        class="form-control"
                        placeholder="Mobile No"
                        style="color: #000"
                        v-model="state.mobileno"
                        />
                        <span class="error-msg" v-if="v$.mobileno.$error"
                        >{{ v$.mobileno.$errors[0].$message }}
                        </span>
                    </div>

                    <div class="modal-buttons">
                        <button class="mb-3" @click="secTwo">Send Now</button>
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
                <p>
                    We have sent a 6 Digit code to <br />
                    following Mobile No
                </p>

                <b>+9477***121</b>
                <span class="resend-area"
                    >Didn't received? Resend
                    <a href="#" @click="resend">Resend</a></span
                >

                <div class="form-group mb-4">
                    <div class="eye-area">
                    <input
                        v-model="state.mobilecode"
                        class="form-control"
                        placeholder="Mobile verification code"
                    />
                    <span class="error-msg" v-if="v$.mobilecode.$error"
                        >{{ v$.mobilecode.$errors[0].$message }}
                    </span>
                    </div>
                </div>

                <div class="eye-area mb-4">
                    <input
                    v-bind:type="[showPassword ? 'text' : 'password']"
                    placeholder="New Password"
                    class="form-control"
                    v-model="state.password"
                    />
                    <div class="eye-box">
                    <i
                        @click="showPassword = !showPassword"
                        :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']"
                        aria-hidden="true"
                    ></i>
                    </div>
                    <span class="error-msg" v-if="v$.password.$error"
                    >{{ v$.password.$errors[0].$message }}
                    </span>
                </div>

                <div class="eye-area mb-4">
                    <input
                    v-bind:type="[showPassword ? 'text' : 'password']"
                    placeholder="Confirm New Password"
                    class="form-control"
                    v-model="state.confirmpassword"
                    />
                    <div class="eye-box">
                    <i
                        @click="showPassword = !showPassword"
                        :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']"
                        aria-hidden="true"
                    ></i>
                    </div>
                    <span class="error-msg" v-if="v$.confirmpassword.$error"
                    >{{ v$.confirmpassword.$errors[0].$message }}
                    </span>
                </div>

                <div class="form-group">
                    <div class="eye-area"></div>
                </div>
                </template>

                <template v-slot:footer>
                <div>
                    <button @click="secThree">Next</button>
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
                    <wizard/>
                <!-- <div class="form-group">
                    <div class="eye-area">
                    <qrcode-vue :value="value" :size="size" level="H" class="cls" />
                    </div>
                </div> -->              
                </template>

                <template v-slot:footer>
                </template>
            </modal>     
  </default-layout>
</template>

<script>
import DefaultLayout from '../layout/DefaultLayout.vue'
import Modal from "../components/Modal/Modal.vue";
import Wizard from "../components/SecuritySetting/Wizard.vue";
//import QrcodeVue from "qrcode.vue";
import useValidate from "@vuelidate/core";
import {
  required,
  numeric,
  minLength,
  sameAs,
  maxLength,
} from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
    name:'order',
    components: { 
      DefaultLayout,
        Modal,
        Wizard
        //QrcodeVue
    //   OpenOrders
    },
    setup() {
        const state = reactive({
        mobileno: "",
        mobilecode: "",
        password: "",
        confirmpassword: "",
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
            password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(12),
            },
            confirmpassword: {
            required,
            sameAs: sameAs(state.password),
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
        showPassword: false,
        value: "otpauth://totp/SupremeCrypX?secret=ZZZQPGOCPUYLJDMP",
        size: 300
      }
    },
  methods: {
    async SecurityTwo() {
      this.$refs.securitytwo.openModal();
    },

    async SecurityThree() {
      this.$refs.securitythree.openModal();
    },

    async SecurityFour() {
      this.$refs.securityfour.openModal();
    },
    async GAuthOne() {
      this.$refs.securityGauthone.openModal();
    },

    async secTwo() {
      this.v$.mobileno.$touch();

      if (!this.v$.mobileno.$error) {
        alert(`Success`);
      } else {
        console.log("Please Enter the valid mobile number");
      }
    },

    async secThree() {
      this.v$.mobilecode.$touch();
      this.v$.password.$touch();
      this.v$.confirmpassword.$touch();
      if (
        !this.v$.mobilecode.$error &&
        !this.v$.mobilecode.$error &&
        !this.v$.mobilecode.$error &&
        this.state.password === this.state.confirmpassword
      ) {
        alert(`Success`);
      } else {
        console.log("Please Enter the valid details");
      }
    },
  }      
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/SecuritySetting/SecuritySetting"
</style>