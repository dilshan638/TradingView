<template>
  <div>
  <div class="inner-block p-r-60">
    <div class="row">
      <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group">
                <div class="profile-pic">
                    <input type="file" id="picture" accept="image/png, image/gif, image/jpeg" />
                    <label for="picture">
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
                  <div ><button @click="oldModal" class="changebutton">Change</button></div>         
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

    <!-- Change Phone Number Modal 1 -->
     <modal ref="FAVerifyModal" class=" modal2-modal border50 no-modal-body-b">
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
           @input="mobileCodeSubmit"
          :disabled="mobileSuccessGARemove == true"
          
        />

        <div class="input-group-append">
          <button
           v-if="btnShowMobile"
           class="btn btn-outline-secondary"
            style="margin-top: 0rem; margin-left: 0rem"
            type="button"
             @click="sendMobileCode"
          >
            Send
          </button>
         <img  v-if="mobileSuccessGARemove && !mobileWrongGARemove" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img v-if="mobileWrongGARemove" src="images/icons/ic_fail@3x.webp" class="pos-img" />
        </div>
      </div>
     
   
      <p
        class="sub-text text-right"
        v-if="!mobileSuccessGARemove " 
        
      >
        Didn't received?
        <a class="link" @click="sendMobileCode">Resend</a>
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
          @input="emailCodeSubmit"
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

      <p class="sub-text text-right" v-if="!EmailuccessGARemove">
        Didn't received?
        <a class="link"   @click="sendEmailVerificationCode" >Resend</a>
      </p>
        </div>
        
        <div class="input-group mb-2 mt-3"  v-if="fa_ga_status == 'true'">
        <input
          type="text"
          class="form-control"
          placeholder="Google Authentication Code"
           v-model="gaCodeGARemove"
           @input="submitGACode"
           :disabled="GASuccess== true"
          
        />
        <div class="input-group-append">
          <img  v-if="GASuccess && !GAWrong" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img   v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
       </div>
        </div>
  </template>
      <template v-slot:footer >
        <div class="btns">
       
           <button v-show="  fa_email_status == 'true' && fa_mobile_status == 'false' && fa_ga_status == 'false'"
                   :disabled="EmailuccessGARemove == false"
                  class="loginbtn btnGA"  @click="next"  >
               Next 
          </button>

           <button v-show="  fa_email_status == 'true' && fa_mobile_status == 'true' && fa_ga_status == 'false'"
                   :disabled="EmailuccessGARemove == false || mobileSuccessGARemove==false"
                  class="loginbtn btnGA"   @click="next"  >
               Next 
          </button>

           <button v-show="  fa_email_status == 'true' && fa_mobile_status == 'false' && fa_ga_status == 'true'"
                 :disabled="EmailuccessGARemove == false || GASuccess==false"
                  class="loginbtn btnGA"    @click="next" >
               Next 
          </button>

           <button v-show="  fa_email_status == 'true' && fa_mobile_status == 'true' && fa_ga_status == 'true'"
                   :disabled="EmailuccessGARemove == false || GASuccess==false ||  mobileSuccessGARemove==false"
                  class="loginbtn btnGA"    @click="next" >
               Next 
          </button>

          <button @click="next">NEXT TEST</button>

          <button
            class="second-btn mb-3" @click="$refs.FAVerifyModal.closeModal()">
            Cancel
          </button>
        </div>
      </template>
    </modal>

  <!-- Change Phone Number Modal 2 -->
     <modal ref="oldPhoneModal" class="ss-modal">
      <template v-slot:header>
        <h2 style="color: black">
        Mobile Number Change
        </h2>
      </template>

      <template v-slot:body>
        <vue-tel-input
                class="form-control"
                
                :valid-characters-only="true" aria-autocomplete="none" v-model="phone" v-on:validate="countryChangedModal" :inputOptions="options"
              >
              </vue-tel-input>
      </template>
      <template v-slot:footer>
        <div>
          <button  class="loginbtn" @click="newmobilenumber">Next</button>
           <button
            class="second-btn mb-3" @click="$refs.FAVerifyModal.closeModal()">
            Cancel
          </button>
        </div>
      </template>
    </modal>

    <!-- Enter MobileCode -->
    <modal ref="otpmodal" class="ss-modal">
      <template v-slot:header>
        <h2 style="color: black">
       Mobile number verification code
        </h2>
      </template>

      <template v-slot:body>
        <div class="input-group mb-2 mt-3"  >
        <input
          type="text"
          class="form-control"
           placeholder="Mobile verification code"
           v-model="otpCode"
           @input="submitOTP"
           :disabled="OTPSuccess== true"
          
        />
        <div class="input-group-append">
          <img  v-if="OTPSuccess && !OTPWrong" src="images/icons/correct.png" class="pos-img error-imgs" />
          <img   v-if="OTPWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
       </div>
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button  class="loginbtn" @click="successModalOTP">Continue</button>
          
        </div>
      </template>
    </modal>

  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
// import { Auth } from "aws-amplify";
import Modal from "../../components/Modal/Modal.vue";

import { required, sameAs ,minLength ,maxLength} from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "Setting",
  components: {
    Modal
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

       mobileno:"",
      fa_ga_status:"",
      fa_email_status:"",
      fa_mobile_status:"",
      phone_number:"",
      stage_code:"",

      mobileCodeMobGARemove:"",
      mobileSuccessGARemove:false,
      mobileWrongGARemove:false,
      btnShowMobile:true,

      btnShowEmailMobGARemove:true,
      EmailWrongGARemove:false,
      EmailuccessGARemove:false,
      emailCodeGARemove:"",

       gaCodeGARemove:"",
      GAWrong:false,
      GASuccess:false,
      token:"",
      newmobileno:"",
     



      options: {
        placeholder: "Phone Number",
        autoFormat: true,
        mode: "international",
        maxlength: 18,
        validCharactersOnly: true,
      },
      options2: {
        showDialCodeInList: true,
        showDialCodeInSelection: true,
        showFlags: true,
        autofocus: true,
       },

       otpCode:"",
       OTPSuccess:false,
       OTPWrong:false,





    };
  },

  methods: {
    countryChanged(phoneObject) {
      this.state.mobileno = phoneObject.nationalNumber;
    },

     countryChangedModal(phoneObject) {
            this.newmobileno = phoneObject.number 
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
               if(Response.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
              this.fa_ga_status = Response.data.result.UserAttributes[i].Value;
           }

           if(Response.data.result.UserAttributes[i].Name=="custom:2fa_email_status"){
              this.fa_email_status = Response.data.result.UserAttributes[i].Value;
           }

              if(Response.data.result.UserAttributes[i].Name=="custom:2fa_mobile_status"){
              this.fa_mobile_status = Response.data.result.UserAttributes[i].Value;
           }
                        
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },

    async oldModal(){
         this.$refs.FAVerifyModal.openModal();
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
      async sendMobileCode() {
      var data = {
        mobile: this.userPhoneNumber,
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
     async mobileCodeSubmit() {
     this.btnShowMobile = false;
      this.mobileWrongGARemove = true;

      if (this.mobileCodeMobGARemove.length == 6) {
        var data = {
          mobile: this.userPhoneNumber,
          code: this.mobileCodeMobGARemove,
          status: "",
          stage_code:this.stage_code,
          stage: 5,
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
    async emailCodeSubmit() {
      this.EmailWrongGARemove = true;
      this.btnShowEmailMobGARemove = false;
      if (this.emailCodeGARemove.length == 6) {
        var data = {
          token: this.emailCodeGARemove,
          status: "",
          stage_code:this.stage_code,
          stage: 5,
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
     async submitGACode() {
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
              status: "",
              stage_code:this.stage_code,
              stage: 5,
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
    async next(){
      this.$refs.FAVerifyModal.closeModal()
      this.$refs.oldPhoneModal.openModal();
    },
     async newmobilenumber(){
      
       if(this.userPhoneNumber==this.newmobileno){
        this.$toast.show("This number is already exits", {type: "success", position: "top"});
        
       }else{
    
    var data = { mobile: this.newmobileno   };
    let hed = { headers: {
                          Authorization: `Bearer ${localStorage.getItem("X-LDX-Inspira-Access-Token" )}`,
                           "Content-Type": "application/json",
                            },
                };
      let response = await this.axios
          .post(
            "https://dapi.exus.live/api/twofa/sms/common/code",
           data,
            hed
          ).then((res) => {
            console.log(response);
            console.log(res)
            this.$toast.show("Successfully  Send SMS Verification Code", {type: "success", position: "top"});
             this.$refs.oldPhoneModal.closeModal()
             this.$refs.otpmodal.openModal();
          })
          .catch(function (error) {
            console.log(error);
               this.$toast.show(error, {type: "success", position: "top"});
          });
     
       }
     }, 

     async successModalOTP(){
         this.$refs.otpmodal.closeModal()
     },

     async submitOTP(){
        this.OTPWrong = true;
      if (this.otpCode.length == 6) {
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
            "https://dapi.exus.live/api/twofa/sms/common/status",
            {
             mobile:this.newmobileno,
             code:this.otpCode
            },
            hed
          )
          .then((res) => {
            this.OTPSuccess = true;
            this.OTPWrong = false;
           
            console.log(response);
            console.log(res)
              this.$router.go();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
     }

  },
  mounted(){
    this.getUserData();
    
    this.clearStatus()
    this.getQRToken()
  }

  
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/Setting/Setting';
  .btns{
    margin-top: 32px;
  }
</style>