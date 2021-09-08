<template>
  <div>
    <div
      v-if="fa_mobile_status == 'true'"
      class="form-group single-row pos-rel security-row"
    >
      <p>Please enter the 6 Digit code that we have sent a to +9477***121</p>
      <input
        type="text"
        class="form-control"
        placeholder="Enter mobile verfication code"
        v-model="mobileCodeMob"
        @input="mobileCodeSubmit"
        :disabled="mobileSuccessMob == true"
      />
     <p class="subline right text-right" v-if="!mobileSuccessMob && timerCount == 0" style="padding-top: 5px;">
        Didn't received?
        <a class="link" @click="sendMobileCode">Resend</a>
      </p>
      <div class="time-socket text-right" v-if="timerCount > 0">Resend OTP in 0:0:{{ timerCount }}</div>
      <h5 v-if="stSMS == 'SMSonly' && mobileLabal" class="lbl">
        Send Successfully Mobile Verification Code
      </h5>

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
    </div>
    <div
      v-if="fa_email_status == 'true'"
      class="form-group single-row pos-rel security-row"
    >
      <p>Please enter the 6 Digit code that we have sent a to ab*@*.com</p>
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
        class="pos-img"
      />
      <img
        v-if="emailWrongEmail"
        src="images/icons/ic_fail@3x.webp"
        class="pos-img"
      />
      <p class="subline right text-right" v-if="!emaileSuccessemail">
        Didn't received?
        <a class="link" @click="sendEmailCode">Resend</a>
      </p>
      <h5 v-if="stEMAIL == 'EMAILonly' && emailLabal" class="lbl">
        Send Successfully Email Verification Code
      </h5>
    </div>

    <div
      v-if="fa_ga_status == 'true'"
      class="form-group single-row pos-rel security-row"
    >
      <p>Please enter the 6 Digit code from Google Authenticator.</p>
      <input
        type="text"
        class="form-control"
        placeholder="Enter Google Authenticator code"
        v-model="googleAuthenticationCode"
        @input="submitGACode"
        :disabled="GASuccess == true"
      />
      <img
        v-if="GASuccess && !GAWrong"
        src="images/icons/correct.png"
        class="pos-img"
      />
      <img v-if="GAWrong" src="images/icons/ic_fail@3x.webp" class="pos-img" />
    </div>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        (fa_email_status == null || fa_email_status == 'false') &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="mobileSuccessMob == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
       fa_email_status=='true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="emaileSuccessemail == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="GASuccess == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        fa_email_status == 'true' &&
        (fa_ga_status == null || fa_ga_status == 'false')
      "
      :disabled="mobileSuccessMob == false || emaileSuccessemail == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        (fa_email_status == null || fa_email_status == 'false') &&
        fa_ga_status == 'true'
      "
      :disabled="mobileSuccessMob == false || GASuccess == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        (fa_mobile_status == null || fa_mobile_status == 'false') &&
        fa_email_status == 'true' &&
        fa_ga_status == 'true'
      "
      :disabled="emaileSuccessemail == false || GASuccess == false"
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>

    <button
      v-show="
        fa_mobile_status == 'true' &&
        fa_email_status == 'true' &&
        fa_ga_status == 'true'
      "
      :disabled="
        emaileSuccessemail == false ||
        GASuccess == false ||
        fa_mobile_status == false
      "
      @click="submit"
      class="loginbtn btn"
    >
      Submit
    </button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      googleAuthenticationCode: "",
      token: "",

      fa_mobile_status: "",
      fa_email_status: "",
      fa_ga_status: "",

      phone_number: "",
      GAWrong: false,

      GASuccess: false,
      emaileSuccessemail: false,
      mobileSuccessMob: false,

      emailWrongEmail: false,
      emailCode: "",
      mobileCodeMob: "",
      mobileWrongMob: false,
      stEmail: false,
      stSMS: "",
      stEMAIL: "",
      emailLabal: true,
      mobileLabal: true,
      statusCode: "",
      timerCount: 60,
    };
  },

  methods: {
  
    async status() {
      //this.fa_mobile_status = localStorage.getItem("fa_mobile_status");
      // this.fa_email_status = localStorage.getItem("fa_email_status");
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
          for (
            let i = 0;
            i < responsive.data.result.UserAttributes.length;
            i++
          ) {
            if (
              responsive.data.result.UserAttributes[i].Name == "phone_number"
            ) {
              this.phone_number =
                responsive.data.result.UserAttributes[i].Value;
              localStorage.setItem("phone_number", this.phone_number);
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
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(
          "X-LDX-Inspira-Access-Token"
        )}`,
      };

      axios
        .get(`https://dapi.exus.live/api/twofa/check/2/${this.statusCode}`, {
          headers: headers,
        })
        .then((responsive) => {
          console.log(responsive);
          this.$router.push("/dashboard");
        })
        .catch(function (error) {
          console.log(error.response.data);
        });
      //
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

    async sendEmailCode() {
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
          this.$toast.show("Successfully Resend Email Verification Code", {
            type: "success",
            position: "top",
          });
          console.log(responsive);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async emailCodeSubmit() {
      this.emailWrongEmail = true;
      this.emailLabal = false;

      if (this.emailCode.length == 6) {
        var data = {
          token: this.emailCode,
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
      this.mobileLabal = false;

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

    async statusCheckMobile() {
      if (localStorage.getItem("stSMS") == "SMSonly") {
        var data = {
          mobile: localStorage.getItem("phone_number"),
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

    async statusCheckEmail() {
      console.log(localStorage.getItem("fa_mobile_status"));
      if (localStorage.getItem("stEMAIL") == "EMAILonly") {
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
            console.log(error.response.data);
          });
      }
    },

    async labalStatus() {
      this.stSMS = localStorage.getItem("stSMS");
      this.stEMAIL = localStorage.getItem("stEMAIL");
      this.fa_mobile_status = localStorage.getItem("fa_mobile_status");
      this.fa_email_status = localStorage.getItem("fa_email_status");
      this.fa_ga_status = localStorage.getItem("fa_ga_status");
    },

    async clearStatus() {
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
          console.log(res);
          this.statusCode = res.data.code;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.labalStatus();
    this.clearStatus();
    this.status();
    this.tokenGA();
  },


  created() {
    this.statusCheckEmail();
    this.statusCheckMobile();
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
@import "../../assets/scss/Permission/Permission";
.btn {
  margin-top: 10px;
  margin-left: 140px;
}

.lbl {
  margin-left: 50px;
  color: green;
}

</style>