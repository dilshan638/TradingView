<template>
  <div>
      <div v-if="fa_mobile_status=='true'" class="form-group single-row pos-rel security-row">
        <p>Please enter the 6 Digit code that we have sent a to +9477***121</p>
        <input
          type="text"
          class="form-control"
          placeholder="Enter mobile verfication code"
           v-model="mobileCodeMob"
           @input="mobileCodeSubmit"
          :disabled="mobileSuccessMob == true"
        />
        <p class="subline right text-right mt-2">
          Didn't received?
          <a class="link" @click="sendMobileCode" >Resend</a>
        </p>
        <h2 v-if="stSMS=='SMSonly'">Send Mobile Verification Code</h2>

        <img v-if="mobileSuccessMob && !mobileWrongMob" src="images/icons/correct.png" class="pos-img" />
        <img v-if="mobileWrongMob" src="images/icons/ic_fail@3x.webp" class="pos-img" />
      </div>
      <div v-if="fa_email_status=='true'" class="form-group single-row pos-rel security-row">
        <p>Please enter the 6 Digit code that we have sent a to ab**@**.com</p>
           <input
              v-model="emailCode"
              class="form-control"
              placeholder="Email verification code"
              @input="emailCodeSubmit"

              :disabled="emaileSuccessemail == true"
            />
        <img   v-if="emaileSuccessemail && !emailWrongEmail" src="images/icons/correct.png" class="pos-img" />
        <img   v-if="emailWrongEmail" src="images/icons/ic_fail@3x.webp" class="pos-img" />
        <p class="subline right"  v-if="!emaileSuccessemail ">
          Didn't received?
          <a class="link" @click="sendEmailCode">Resend</a>
        </p>
        <h2 v-if="stEMAIL=='EMAILonly' ">Send Email Verification Code</h2>
      </div>
      <div v-if="fa_ga_status=='true'" class="form-group single-row pos-rel security-row">
        <p >Please enter the 6 Digit code from Google Authenticator.</p>
        <input
          type="text"
           class="form-control"
           placeholder="Enter Google Authenticator code"
           v-model="googleAuthenticationCode"
           @input="submitGACode"
           :disabled="GASuccess == true"
           
        />
        <img  v-if="GASuccess && !GAWrong" src="images/icons/correct.png" class="pos-img" />
        <img   v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
      </div>
      <div class="text-center">
        <button class="loginbtn mt-3 mb-0">Submit</button>


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
               
              >
                Send
              </button>
                  <img
                  
                    src="images/icons/correct.png"
                    class="pos-img error-imgs"
                  />
                  <img
                    
                    src="images/icons/ic_fail@3x.webp"
                    class="pos-img"
                  />
            </div>
          </div>
       
      <div>
        <button @click="submit" class="loginbtn btn">Submit</button>
      </div>
  </div>
</template>
<script>

import axios from 'axios'
export default {
  components: {
 
  },
  data(){
      return{
          googleAuthenticationCode:"",
          token:"",
          fa_ga_status:"",
          fa_email_status:"",
          phone_number:"",
          fa_mobile_status:"",
          GAWrong:false,
          GASuccess:false,
          emailWrongEmail:false,
         emailCode:"",
         emaileSuccessemail:false,
         mobileCodeMob:"",
        mobileSuccessMob:false,
        mobileWrongMob:false,
        stEmail:false,
        stSMS:"",
        stEMAIL:"",

      }
  },

  methods: {
    async status() {
      this.fa_mobile_status=  localStorage.getItem('fa_mobile_status' )
       this.fa_email_status=  localStorage.getItem('fa_email_status' )
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
          console.log(responsive);
            for(let i = 0; i < responsive.data.result.UserAttributes.length; i++){

        //   if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
             // this.fa_ga_status = responsive.data.result.UserAttributes[i].Value;
          //    console.log(this.fa_ga_status)
             
         //  }

        //   if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_email_status"){
          //    this.fa_email_status = responsive.data.result.UserAttributes[i].Value;
            //   localStorage.setItem('fa_email_status',this.fa_email_status )
        //   }

              if(responsive.data.result.UserAttributes[i].Name=="phone_number"){
              this.phone_number = responsive.data.result.UserAttributes[i].Value;
              localStorage.setItem('phone_number',this.phone_number )
              
           }
             // if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_mobile_status"){
           //   this.fa_mobile_status = responsive.data.result.UserAttributes[i].Value;
              //  localStorage.setItem('fa_mobile_status',this.fa_mobile_status )
           //}
          }
          
         
        })
        .catch(function (error) {
          console.log(error);
        });

       
        
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
    async submit() {
      this.$router.push("/dashboard");
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
              status: "",
              stage: 2,
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

    async sendEmailCode(){
     
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

    async emailCodeSubmit() {
      this.emailWrongEmail = true;

      if (this.emailCode.length ==6) {
        var data = {
          token: this.emailCode,
          status:"",
          stage: 2,
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

    async sendMobileCode() {
     
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
    },
    async mobileCodeSubmit() {
     
      this.mobileWrongMob = true;

      if (this.mobileCodeMob.length == 6) {
        var data = {
          mobile: this.phone_number,
          code: this.mobileCodeMob,
          status: "",
          stage: 2,
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

    async statusCheckMobile(){


        if( localStorage.getItem('stSMS' )=='SMSonly'){
           var data = {
           mobile: localStorage.getItem('phone_number' )
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
        }

      
    },

    async statusCheckEmail(){
     if((localStorage.getItem('stEMAIL' )=='EMAILonly')){
         
     const headers = { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem( "X-LDX-Inspira-Access-Token" )}`,
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
         
         
        });
        }
},

async labalStatus(){
    this.stSMS=  localStorage.getItem('stSMS' )
    this.stEMAIL= localStorage.getItem('stEMAIL' )
    this.fa_ga_status = localStorage.getItem('fa_ga_status' )
  
    
}


},

   


   
  mounted() {
    
    this.status()
    this.tokenGA()
   
    this.labalStatus()
   

  
   
    
  },

  created(){
   this.statusCheckEmail()
    this.statusCheckMobile()
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Permission/Permission";
.btn{
    margin-top: 10px;
    margin-left: 130px;
}
</style>
