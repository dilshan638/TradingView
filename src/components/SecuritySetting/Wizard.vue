<template>
    <div class="step-bar">
<ul>
            <li v-bind:class="[showContentOne ? 'active' : 'passed']">
                <div class="dot"></div>
                <div class="line"></div>
                Download App
            </li>
            <li v-bind:class="[showContentTwo && !showContentOne && !showContentThree || showContentThree && !showContentFour ||showContentFour? 'active' : '']">
                <div class="dot"></div>
                <div class="line"></div>
                Scan QR Code
            </li>
            <li v-bind:class="[showContentThree && !showContentFour ||showContentFour ? 'active' : '']">
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
                <div class="app-box">
                    <i class="ri-apple-fill"></i> App Store
                </div>
                <div class="app-box">
                    <i class="ri-google-play-fill"></i> Google Play
                </div>                
            </div>
        </div>
        <div class="btn-bottom">
            <button  @click="nextOneToTwo">Next</button>
        </div>
    </div>
    <div v-if="showContentTwo && !showContentOne && !showContentThree" class="wizard-box">
        <div class="wizard-inner">
            <p class="mb-5">Scan this QR code using Google Authenticator app</p>
            <div class="qr">
                 <qrcode-vue :value="value" :size="size" level="H" class="cls" />
                 <b>PUWGGOQRYYABG64V</b>
            </div>
            <p class="sub">If you are unable to scan the QR code, please enter this code manually into the app.</p>
        </div>
        <div class="btn-bottom">
            <button @click="previousTwoToOne" class="prev">Previous</button>
            <button @click="nextTwoToThree">Next</button>
        </div>
    </div>
    <div v-if="showContentThree && !showContentFour" class="wizard-box">
        <div class="wizard-inner">
            <p class="mb-5">Please save this Key on paper. This Key will allow you to recover your<br/>
Google Authenticator in case of phone loss.</p>
            <div class="qr">
                 <b class="btn-type">PUWGGOQRYYABG64V</b>
            </div>
            <p class="sub">Resetting your Google Authentication requires opening a<br/>
support ticket and takes at least 7 days to process.</p>
        </div>
        <div class="btn-bottom">
            <button class="prev"  @click="previousThreeToTwo">Previous</button>
            <button @click="nextThreeToFour">Next</button> 
        </div>
    </div>
    <div v-if="showContentFour" class="wizard-box">
        <div class="wizard-inner">
            <p class="mb-5">Finish security verification and enable Google Authenticator</p>
            <div class="form-wizard">
                <div class="form-wizard-row">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="subline">Please enter the  6 Digit code that we have sent a to  +9477***121</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <input type="text" class="form-control" placeholder="Mobile verification code" />
                        </div>
                        <div class="col-md-5">
                            <p class="subline right">Didn't received? <a href="#">Resend</a></p>
                        </div>
                    </div>
                </div>
                <div class="form-wizard-row">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="subline">Please enter the  6 Digit code that we have sent a to  ab**@**.com</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <input type="text" class="form-control" placeholder="Email verification code" />
                        </div>
                        <div class="col-md-5">
                            <p class="subline right">Didn't received? <a href="#">Resend</a></p>
                        </div>
                    </div>
                </div>  
                <div class="form-wizard-row">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="subline">Please enter the 6 Digit code from Google Authenticator.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <input type="text" class="form-control" placeholder="Email verification code" />
                        </div>
                        <div class="col-md-5">
                        </div>
                    </div>
                </div>                               
            </div>
        </div>
         <div class="btn-bottom">
            <button class="prev"  @click="previousFourToThree">Previous</button>
            <button @click="submit">Next</button>
         </div>
    </div>  
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "wizard",
      components: { 
        QrcodeVue
    },
  data() {
    return {
      showContentOne: true,
      showContentThree: false,
      showContentFour: false,
       showPassword: false,
        value: "otpauth://totp/SupremeCrypX?secret=ZZZQPGOCPUYLJDMP",
        size: 120
    //  showContentFive: false,
    };
  },


  methods: {

    
    nextOneToTwo() {
    
      this.showContentOne = false;
      this.showContentTwo=true;
    },
    previousTwoToOne() {
      this.showContentOne=true;
     
    },
   nextTwoToThree() {
    
      this.showContentThree = true;
     
    },
     previousThreeToTwo() {
     this.showContentTwo=true;
     this.showContentOne=false;
     this.showContentThree=false
     
    },

     nextThreeToFour() {
    
      this.showContentFour = true;
      
     
    },
     previousFourToThree() {
     this.showContentThree=true;
     this.showContentFour=false;
    
     
    },
    submit(){
      alert('Success')
    }
  
  },
};
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/SecuritySetting/SecuritySetting"
</style>