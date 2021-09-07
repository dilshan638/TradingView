<template>
  <div>
      <div class="form-group single-row pos-rel security-row">
        <p>Please enter the 6 Digit code that we have sent a to +9477***121</p>
        <input
          type="text"
          class="form-control"
          placeholder="Enter mobile verfication code"
        />
        <p class="subline right">
          Didn't received?
          <a class="link" @click="sendEmailVerificationCode">Resend</a>
        </p>
        <img src="images/icons/correct.png" class="pos-img" />
        <img src="images/icons/ic_fail@3x.webp" class="pos-img" />
      </div>
      <div v-if="fa_email_status=='true'" class="form-group single-row pos-rel security-row">
        <p>Please enter the 6 Digit code that we have sent a to ab**@**.com</p>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Email verfication code"
        />
        <img src="images/icons/correct.png" class="pos-img" />
        <img src="images/icons/ic_fail@3x.webp" class="pos-img" />
        <p class="subline right">
          Didn't received?
          <a class="link" @click="sendEmailVerificationCode">Resend</a>
        </p>
      </div>
      <div v-if="fa_ga_status=='true'" class="form-group single-row pos-rel security-row">
        <p >Please enter the 6 Digit code from Google Authenticator.</p>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Google Authenticator code"
          v-model="googleAuthenticationCode"
        />
        <img src="images/icons/correct.png" class="pos-img" />
        <img src="images/icons/ic_fail@3x.webp" class="pos-img" />
      </div>
      <div>
        <button class="loginbtn">Submit</button>
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

          


      }
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
          console.log(responsive);
            for(let i = 0; i < responsive.data.result.UserAttributes.length; i++){

           if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
              this.fa_ga_status = responsive.data.result.UserAttributes[i].Value;
              console.log(this.fa_ga_status)
           }

           if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_email_status"){
              this.fa_email_status = responsive.data.result.UserAttributes[i].Value;
           }

              if(responsive.data.result.UserAttributes[i].Name=="phone_number"){
              this.phone_number = responsive.data.result.UserAttributes[i].Value;

              console.log(this.phone_number)
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

  },

   


   
  mounted() {
    
    this.status()
    this.tokenGA()
   
    
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/Permission/Permission";
</style>
