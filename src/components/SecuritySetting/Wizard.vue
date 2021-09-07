<template>
  <div>
    <div class="step-bar">
      <ul>
        <li v-bind:class="[showContentOne ? 'active' : 'passed']">
          <div class="dot"></div>
          <div class="line"></div>
          Download App
        </li>
        <li
          v-bind:class="[
            (showContentTwo && !showContentOne && !showContentThree) ||
            (showContentThree && !showContentFour) ||
            showContentFour
              ? 'active'
              : '',
          ]"
        >
          <div class="dot"></div>
          <div class="line"></div>
          Scan QR Code
        </li>
        <li
          v-bind:class="[
            (showContentThree && !showContentFour) || showContentFour
              ? 'active'
              : '',
          ]"
        >
          <div class="dot"></div>
          <div class="line"></div>
          Backup Key
        </li>
        <li v-bind:class="[showContentFour ? 'active' : '']">
          <div class="dot"></div>
          <div class="line"></div>
          Enabled Google authenticator
        </li>
        <li>
          <div class="dot"></div>
          Complete
        </li>
      </ul>
    </div>
    <div v-if="showContentOne" class="wizard-box">
      <div class="wizard-inner">
        <p class="mb-5">Download and install the Google Authenticator app</p>
        <p>Download from</p>
        <div class="app-download">
          <div class="app-box"><i class="ri-apple-fill"></i> App Store</div>
          <div class="app-box">
            <i class="ri-google-play-fill"></i> Google Play
          </div>
        </div>
      </div>
      <div class="btn-bottom">
        <button @click="nextOneToTwo">Next</button>
      </div>
    </div>
    <div
      v-if="showContentTwo && !showContentOne && !showContentThree"
      class="wizard-box"
    >
      <div class="wizard-inner">
        <p class="mb-5">Scan this QR code using Google Authenticator app</p>
        <div class="qr">
          <img :src="qrdata" />
          <b>{{ token[1] }}</b>
        </div>
        <p class="sub">
          If you are unable to scan the QR code, please enter this code manually
          into the app.
        </p>
      </div>
      <div class="btn-bottom">
        <button @click="previousTwoToOne" class="prev">Previous</button>
        <button @click="nextTwoToThree">Next</button>
      </div>
    </div>
    <div v-if="showContentThree && !showContentFour" class="wizard-box">
      <div class="wizard-inner">
        <p class="mb-5">
          Please save this Key on paper. This Key will allow you to recover
          your<br />
          Google Authenticator in case of phone loss.
        </p>
        <div class="qr">
          <b class="btn-type">{{ token[1] }}</b>
        </div>
        <p class="sub">
          Resetting your Google Authentication requires opening a<br />
          support ticket and takes at least 7 days to process.
        </p>
      </div>
      <div class="btn-bottom">
        <button class="prev" @click="previousThreeToTwo">Previous</button>
        <button @click="nextThreeToFour">Next</button>
      </div>
    </div>
    <div v-if="showContentFour" class="wizard-box">
      <div class="wizard-inner">
        <p class="mb-5">
          Finish security verification and enable Google Authenticator
        </p>
        <div class="form-wizard">
          <div class="form-wizard-row" v-if="fa_mobile_status == 'true'">
            <div class="row">
              <div class="col-md-12">
                <p class="subline">
                  Please enter the 6 Digit code that we have sent a to
                  +9477***121
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="input-group single-row mb-2 pos-rel">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Mobile verification code"
                    v-model="mobileCodeMob"
                    @input="mobileCodeSubmitMob"
                     :disabled="mobileSuccessMob == true"
                  />
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
                  <div class="input-group-append">
                    <button
                      v-if="btnShowMobileMob"
                      class="btn"
                      @click="sendMobileCode"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-5" v-if="!mobileSuccessMob">
                <p class="subline right">
                  Didn't received?
                  <a class="link" @click="sendMobileCode">Resend</a>
                </p>
              </div>
            </div>
          </div>
          <div class="form-wizard-row" v-if="fa_email_status == 'true'">
            <div class="row">
              <div class="col-md-12">
                <p class="subline">
                  Please enter the 6 Digit code that we have sent a to
                  ab*@*.com
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="input-group single-row">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email verification code"
                    v-model="emailCode"
                    @input="emailCodeSubmit"
                     :disabled="Emailuccess == true"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn"
                      v-if="btnShowEmailMob"
                      @click="sendEmailVerificationCode"
                    >
                      Send
                    </button>
                  </div>

                  <img
                    v-if="Emailuccess && !EmailWrong"
                    src="images/icons/correct.png"
                    class="pos-img error-imgs"
                  />
                  <img
                    v-if="EmailWrong"
                    src="images/icons/ic_fail@3x.webp"
                    class="pos-img"
                  />
                </div>
              </div>
              <div class="col-md-5">
                <p class="subline right">
                  Didn't received?
                  <a class="link" @click="sendEmailVerificationCode">Resend</a>
                </p>
              </div>
            </div>
          </div>
          <div class="form-wizard-row">
            <div class="row">
              <div class="col-md-12">
                <p class="subline">
                  Please enter the 6 Digit code from Google Authenticator.
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-7">
                <div class="input-group single-row">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Google Authentication Code"
                    v-model="googleAuthenticationCode"
                    @input="submitGACode"
                     :disabled="GASuccess == true"
                  />
                  <img
                    v-if="GASuccess && !GAWrong"
                    src="images/icons/correct.png"
                    class="pos-img error-imgs"
                  />
                  <img
                    v-if="GAWrong"
                    src="images/icons/ic_fail@3x.webp"
                    class="pos-img"
                  />
                </div>
              </div>
              <div class="col-md-5"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-bottom">
        <button class="prev" @click="previousFourToThree">Previous</button>
        <button @click="submit">Next</button>
      </div>
    </div>
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
          <button @click="successGAModal" class="loginbtn">Continue</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../../components/Modal/Modal.vue";

export default {
  name: "wizard",
  components: { Modal },
  data() {
    return {
      emailCode: "",
      showContentOne: true,
      showContentThree: false,
      showContentFour: false,
      showPassword: false,
      value: "",
      size: 120,
      qrdata: "",
      token: "",
      googleAuthenticationCode: "",
      //  showContentFive: false,
      GAWrong: false,
      GASuccess: false,
      Emailuccess: false,
      EmailWrong: false,

      gaStatus: "",
      fa_ga_status: "",
      fa_email_status: "",
      fa_mobile_status: "",
      phone_number: "",
      mobileCodeMob: "",
      btnShowEmailMob: true,
      btnShowMobileMob: true,
      mobileWrongMob: false,
      mobileSuccessMob: false,
      GAOneTimeStatusSend: "",
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
            console.log(responsive)
         for(let i = 0; i < responsive.data.result.UserAttributes.length; i++){

           if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
              this.fa_ga_status = responsive.data.result.UserAttributes[i].Value;
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
      //    this.fa_ga_status = responsive.data.result.UserAttributes[16].Value;
       //   this.fa_email_status = responsive.data.result.UserAttributes[5].Value;
        //  this.phone_number = responsive.data.result.UserAttributes[14].Value;
       //   this.fa_mobile_status =responsive.data.result.UserAttributes[7].Value;

         
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    nextOneToTwo() {
      this.showContentOne = false;
      this.showContentTwo = true;
    },
    previousTwoToOne() {
      this.showContentOne = true;
    },
    nextTwoToThree() {
      this.showContentThree = true;
    },
    previousThreeToTwo() {
      this.showContentTwo = true;
      this.showContentOne = false;
      this.showContentThree = false;
    },

    nextThreeToFour() {
      this.showContentFour = true;
    },
    previousFourToThree() {
      this.showContentThree = true;
      this.showContentFour = false;
    },
    async submit() {
      this.$refs.successfullyModal.openModal();
    },

    async getCryptoAll() {
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
          this.value = response.data.secretdata;
          this.qrdata = response.data.qrdata;
          console.log(this.value);
          this.token = response.data.secretdata.split(
            "otpauth://totp/Inspira?secret="
          );
          console.log(this.token);
        })
        .catch(function (error) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
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

        if (this.fa_ga_status == "true") {
          this.gaStatus = "disable";
        } else {
          this.gaStatus = "enable";
        }

        let response = await this.axios
          .post(
            "https://dapi.exus.live/api/twofa/ga/status",
            {
              secret: this.token[1],
              token: this.googleAuthenticationCode,
              status: this.gaStatus,
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

    async emailCodeSubmit() {
      this.EmailWrong = true;
      this.btnShowEmailMob = false;
      if (this.emailCode.length == 6) {
        var data = {
          token: this.emailCode,
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
            this.Emailuccess = true;
            this.EmailWrong = false;
            console.log(res);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },

    async mobileCodeSubmitMob() {
      this.btnShowMobileMob = false;
      this.mobileWrongMob = true;

      if (this.mobileCodeMob.length == 6) {
        var data = {
          mobile: this.phone_number,
          code: this.mobileCodeMob,
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

    async postGoogleAuthenticator() {
      console.log(this.token);
      console.log(this.googleAuthenticationCode);
    },

    async successGAModal() {
      if (this.fa_ga_status == "true") {
        this.GAOneTimeStatusSend = "disable";
      } else {
        this.GAOneTimeStatusSend = "enable";
      }
      var data = {
        status: this.GAOneTimeStatusSend,
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
  },

  mounted() {
    this.status();
    this.getCryptoAll();
    this.postGoogleAuthenticator();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/SecuritySetting/SecuritySetting";
</style>