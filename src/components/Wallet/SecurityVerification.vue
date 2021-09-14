<template>
   <div>
        <div class="row">
        <div class="col-md-12">
            <div class="card Security-model">
            <div class="card-body Security-model mb-0">
                <div class="row">
                <div class="col-md-3">
                    <p class="Card-ph">Amount</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{withdrawAmount}}  {{selectCoin}} (Network Fee {{free}} {{balanceSymbol}})</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph">Address</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2">{{withdrawAddress}}</p>
                </div>

                <div class="col-md-3">
                    <p class="Card-ph pb-0">Network</p>
                </div>
                <div class="col-md-9">
                    <p class="Card-ph-2 pb-0">{{network}}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>

        <!-- Mobile -->
    <div class="form-group pos-rel sec-row mb-3 mt-3" v-if="fa_mobile_status== 'true'">
        <p class="sub-text">Please enter the  6 Digit code that we have sent a to  +9477***121</p>
        <div class="input-group mb-2">
               <input
        type="text"
        class="form-control"
        placeholder="Enter mobile verfication code"
        v-model="mobileCodeMob"
        @input="mobileCodeSubmit"
        :disabled="mobileSuccessMob == true"
      />
       <img
        v-if="mobileSuccessMob && !mobileWrongMob"
        src="images/icons/correct.png"
        class="pos-img"
      />
      <img
        v-if="mobileWrongMob"
        src="images/icons/ic_fail@3x.webp"
        class="pos-img"
      />
           <div class="input-group-append">
            <button class="btn btn-outline-secondary" v-if="btnMob" @click="sendMobileCode" style="margin-top: 0rem; margin-left: 0rem;" type="button">Send</button>
            </div>
        </div>
        <p v-if="!mobileSuccessMob" class="sub-text text-right">Didn't received? <a class="link" @click="sendMobileCode">Resend</a></p>
    </div>

      <!-- Email -->
    <div class="form-group pos-rel sec-row">
        <p class="sub-text">Please enter the  6 Digit code that we have sent a to  ab**@**.com</p>
        <div class="input-group mb-2">
            <input
            v-model="emailCode"
            class="form-control"
            placeholder="Email verification code"
            @input="emailCodeSubmit"
            :disabled="emaileSuccessemail == true"
          />
             <img
                   v-if="emaileSuccessemail && !emailWrongEmail"
                  src="images/icons/correct.png"
                  class="pos-img error-imgs"  />
              <img
                  v-if="emailWrongEmail"
                  src="images/icons/ic_fail@3x.webp"
                  class="pos-img" />  

            <div class="input-group-append">
            <button class="btn btn-outline-secondary"  v-if="btnEmail" @click="senEmailCode" style="margin-top: 0rem; margin-left: 0rem;" type="button">Send</button>
            </div>
        </div>
        <p v-if="!emaileSuccessemail" class="sub-text text-right">Didn't received? <a class="link" @click="senEmailCode">Resend</a></p>
    </div>  

      <!-- GA -->

    <div class="row mt-3" v-if="fa_ga_status== 'true'">
        <div class="col-md-12 ">
        <p class="Paragraph-Line sub-text">Please enter the 6 Digit code from Google Authenticator</p>             
        <div class="form-group Modal-Textfiel pos-rel">
             <input
                type="text"
                class="form-control"
                placeholder="Enter Google Authenticator code"
                v-model="googleAuthenticationCode"
                @input="submitGACode"
                :disabled="GASuccess == true"  />
              <img
                v-if="GASuccess && !GAWrong"
                src="images/icons/correct.png"
                class="pos-img"
              />
               <img v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
      
        </div>
        </div>
    </div>

 
   
    
    
   </div>
   
</template>

<script>
import axios from 'axios'
export default {
props:['selectCoin','withdrawAddress','network','withdrawAmount','free','balanceSymbol'],

data(){
    return{
        
         fa_mobile_status:"",
         fa_ga_status:"",
         fa_email_status:"",

          GASuccess: false,
          emaileSuccessemail: false,
          mobileSuccessMob: false,

          emailWrongEmail: false,
          mobileWrongMob: false,
          GAWrong: false,

           btnEmail:true,
           btnMob:true,
           emailCode:"",
           mobileCodeMob:"",
           googleAuthenticationCode:"",
           token:"",
           phone_number:""
           
         
    }
},

methods:{
    async status(){
        this.fa_mobile_status= localStorage.getItem('fa_mobile_status' )
        this.fa_ga_status= localStorage.getItem('fa_ga_status' )
         this.fa_email_status = localStorage.getItem("fa_email_status");
         this.phone_number= localStorage.getItem("phone_number");

    },

    async senEmailCode(){
        
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
        .then((res) => {
          console.log(res);
           this.$toast.show("Successfully  Send Email Verification Code", {type: "success", position: "top"});
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async sendMobileCode(){
         var data = {
        mobile:   localStorage.getItem('phone_number' ),
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
      ).then((res) => {
          console.log(res);
          console.log(response)
          this.$toast.show("Successfully  Send Mobile Verification Code", {type: "success", position: "top"});
        })
        .catch(function (error) {
          console.log(error);
        });
       
       
    },


     async emailCodeSubmit() {
      this.emailWrongEmail = true;
      
       this.btnEmail=false

      if (this.emailCode.length == 6) {
        var data = {
          token: this.emailCode,
          status: "withdraw",
          stage: 3,
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
 
    async mobileCodeSubmit() {
      this.mobileWrongMob = true;
      this.mobileLabal = false;
      this.btnMob=false

      if (this.mobileCodeMob.length == 6) {
        var data = {
          mobile: this.phone_number,
          code: this.mobileCodeMob,
          status: "withdraw",
          stage: 3,
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
     async tokenGA() {
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
          this.token = response.data.secretdata.split(
            "otpauth://totp/Inspira?secret="
          );
          console.log(this.token[1]);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    },
      async submitGACode() {
      this.GAWrong = true;
      if (this.googleAuthenticationCode.length == 6) {
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
              token: this.googleAuthenticationCode,
              status: "withdraw",
              stage: 3,
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

    
  
},

mounted(){
   this.status()
   this.tokenGA()
},

}
</script>


<style lang="scss" scoped>
  @import "Crypto.scss";
</style>