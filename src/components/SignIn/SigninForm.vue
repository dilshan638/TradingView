<template>
    <div class="form-layout">
        <div class="row">
            <div class="col-lg-6 mobile-hide no-padding">
                <div class="left-logo">
                    <img src="images/logo/logo.png" alt="LDCX" title="LDCX" />
                </div>
            </div>
            <div class="col-lg-6 no-padding">
                <div class="right-form">
                    <h2>LDCX Exchange</h2>
                    <div class="eye-area mb-4">
                        <input placeholder="Email" v-model="state.email" class="form-control" :class="{ 'form-group--error': v$.email.$error }" ref="usernamef" />
                        <span class="error-msg" v-if="v$.email.$error">Username {{ v$.email.$errors[0].$message }} </span>
                    </div>
                    <div class="eye-area mb-5">
                        <input v-bind:type="[showPassword ? 'text' : 'password']" placeholder="Password" :class="{ 'form-group--error': v$.password.password.$error }" v-model="state.password.password" class="form-control" />
                            <div class="eye-box">
                                <i @click="showPassword = !showPassword" :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>
                            </div>
                        <span class="error-msg" v-if="v$.password.password.$error">Password {{ v$.password.$errors[0].$message }} </span>
                    </div>
                    <button class="centered login-btn" @click="SubmitForm" :disabled="startspinner == true">                       
                        <div class="spinner-border spinner-border-sm" v-if="startspinner" role="status"></div>
                            Login
                        </button>
                    <span class="forgot-link" @click="gotoforgotpassword">Forgot Password</span>
                </div>
            </div>
        </div>
        <modal ref="forgotpasswordmodal" class="forgot-modal border50 no-footer">
            <template v-slot:header>
                <h2 style="color:black">Forgot Password</h2>
            </template>
            <template v-slot:body>
                    <h5 style="color:black">Enter your Email Address</h5>
                    <div class="form-group pos-rel">    
                        <input type="email" class="form-control" placeholder="Email Address" style="color:#000" v-model="state.forgotpasswordemail" :class="{ 'form-group--error': v$.forgotpasswordemail.$error }" />
                        <span class="error-msg" v-if="v$.forgotpasswordemail.$error">Email Address {{ v$.forgotpasswordemail.$errors[0].$message }} </span>  
                    </div>
                    <div class="modal-buttons">
                        <button class="mb-3" @click="forgotpassword">Next</button>
                        <button  class="second-btn mb-3" @click="$refs.forgotpasswordmodal.closeModal()">Cancel</button>
                    </div>  
            </template>
        </modal>
        <modal ref="otpcodemodal" class="border50">
            <template v-slot:header>
                <h2 style="color:black">Security Verification</h2>
            </template>
            <template v-slot:body>
                <p class="modal-text-p" style="padding-bottom: 55px !important;">Enter the 6 digit code received by {{ emailnewmask }}</p>
                <div class="input-group mb-4">
                    <input type="text" class="form-control" placeholder="Email Verification code" v-model="state.verificationCode" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary input-group-btn sub-action" @click="resend" type="button">Resend</button>
                    </div>
                    <span class="error-msg" v-if="v$.verificationCode.$error">{{ v$.verificationCode.$errors[0].$message }} </span> 
                </div>                    
                <div class="form-group mb-4 pos-rel">
                    <div class="input_container" v-if="showPasswordLength">
                        <ul>
                            <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                            <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                            <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                            <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character</li>
                        </ul>
                    </div> 
                    <div class="password-suggestion-box" v-if="showPasswordSuggestion">
                        <h3>Auto generated Password</h3>
                        <i class="ri-close-line remove-icon" @click="closepasswordbox"></i>
                        <div class="password-view">
                            {{passwordsuggestionvalue}}
                        </div>
                        <div class="bottom-btn">
                            <button class="btn btn-outline" @click="passwordGenereate">Generate New</button>
                            <button class="btn btn-primary" @click="usePassword">Use this</button>
                        </div>
                    </div>                           
                    <div class="input-group eye-area">
                        <input v-bind:type="[showPasswordotp ? 'text' : 'password']" class="form-control" 
                        @input="checkPassword" placeholder="Password" v-model="state.newPassword" @focus="showPasswordLength = true" @blur="removepophover"
                            />
                            
                            <div class="eye-box eye-custom">
                                <i @click="showPasswordotp = !showPasswordotp" :class="[showPasswordotp ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                            </div>                              
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary input-group-btn sub-action" @click="showPasswordSuggestion = true" type="button">
                                    <i class="ri-lock-password-line"></i>
                                </button>
                            </div>
                    <span class="error-msg" v-if="v$.newPassword.$error">{{ v$.newPassword.$errors[0].$message }} </span> 
                    </div>                        
                </div>
                <div class="form-group">
                    <div class="eye-area">
                        <input v-bind:type="[showPasswordotpconfirm ? 'text' : 'password']" class="form-control" placeholder="Confirm New Password" v-model="state.confirmPassword" />
                            <div class="eye-box">
                                <i @click="showPasswordotpconfirm = !showPasswordotpconfirm" :class="[showPasswordotpconfirm ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                            </div>      
                                               
                    <span class="error-msg" v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }} </span> 
                    </div>
                </div>                                                
                
            </template>

            <template v-slot:footer>
                <div>
                    <button @click="otpcheck">Next</button>
                     <button  class="second-btn mt-2" @click="$refs.otpcodemodal.closeModal()">Cancel</button>
                </div>
            </template>
        </modal>   
        <modal ref="successmodal" class="border50">
            <template v-slot:header>
                <h2 style="color:black">Password Changed!</h2>
            </template>

            <template v-slot:body>
                <img class="correct" src="images/icons/correct.png" />
                <p>
                    Please log in with the <br/>
                    New Password
                </p>
            </template>
            <template v-slot:footer>
                <div>
                    <button @click="$refs.successmodal.closeModal()" class="loginbtn">Login</button>
                </div>
            </template>
        </modal>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import useValidate from '@vuelidate/core'
import { required, email,sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import Modal from "../Modal/Modal.vue";
var generator = require('generate-password');
import CryptoJS from "crypto-js";
import axios from 'axios'

export default {
    name:'signin',
    components: {
        Modal
    },
    setup() {
        const state = reactive({
            email:'',
            password: {
                password: ''
            },
            forgotpasswordemail:'',
            verificationCode:'',
            newPassword:'',
            confirmPassword:'',
        })

        const rules = computed(() => {
            return {
                email: { 
                    required, 
                    email
                },
                password: {
                    password: { 
                        required
                    }
                },
                forgotpasswordemail:{
                    email,
                    required
                },
                verificationCode:{
                    required
                },
                newPassword:{
                     required
                },
                confirmPassword:{
                     required,
                     sameAs:sameAs(state.newPassword)
                },
                
            }    
        }) 
        
        const v$ = useValidate(rules, state)
        return { state, v$ }
    }, 
    data() {
        return { 
            inspira_2fa_status:"",
            inspira_id:"",
            isHidden: false,
            showPassword: false,
            showPasswordotp: false,
            showPasswordotpconfirm: false,
            isHiddenMobile: false,
            showPasswordMobile: false,
            showPasswordLength:false,
            showPasswordSuggestion: false,
            passwordsuggestionvalue: '',
            newpasswordone: '',
            emailnewmask: '',
            startspinner: false,
            usertype: "",
            picture: "",

            password_length: 0,
            contains_eight_characters: false,
            contains_number: false,
            contains_uppercase: false,
            contains_special_character: false,
            valid_password: false,  
            submitdisabled: true,
            phone_number:"",
 
             data: {
                firstName: "",
                lastName: "",
                email: "",
                url:'https://inspira.exus.live/'
                },
              secret: "LDXINspiraKey#@!",
              encData:""   
        }
    },
    methods: {   
        removepophover() {
            this.showPasswordSuggestion = false;
            this.showPasswordLength = false
        },
        checkPassword() {
            this.password_length = this.state.newPassword.length;
            //eslint-disable-next-line
            const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (this.password_length >= 8) {
                this.contains_eight_characters = true;
            } else {
                this.contains_eight_characters = false;
            }
            this.contains_number = /\d/.test(this.state.newPassword);
            this.contains_uppercase = /[A-Z]/.test(this.state.newPassword);
            this.contains_special_character = format.test(this.state.newPassword);
            if (this.contains_eight_characters === true &&
                    this.contains_special_character === true &&
                    this.contains_uppercase === true &&
                    this.contains_number === true) {
                        this.valid_password = true;			
            } else {
                this.valid_password = false;
            }
        },  
        async stopspinner() {
            this.startspinner = false
        },     
        async login() {
            this.startspinner = true;
               try {
                await Auth.signIn(this.state.email, this.state.password.password)
                .then(data=>{
                    console.log(data);
                    this.accToken=data.signInUserSession.accessToken.jwtToken
                    this.data.firstName=data.attributes.name
                    this.data.lastName=data.attributes.middle_name
                    this.data.email=this.state.email
                    localStorage.setItem('emailmask', data.signInUserSession.accessToken.payload.username)
                    localStorage.setItem('usermobile', data.signInUserSession.idToken.payload.phone_number)
                    localStorage.setItem('X-LDX-Inspira-Access-Token',data.signInUserSession.accessToken.jwtToken)
                    console.log(data.signInUserSession.idToken.payload.phone_number)
                })
                this.loginbtn = false;
                    console.log('Yes')
                    this.encryptData()
                   // window.location.href = `http://localhost:8081/kyc?data=${this.encData}`
                  //  window.location.href = `http://localhost:8080/#/dashboard`

                   // this.$router.push("/dashboard");
                   
              const headers = { "Content-Type": "application/json", Authorization: this.accToken, };
           
             axios .get("https://dapi.exus.live/api/mobile/v1/user/cognito/info", { headers: headers, })
                 .then((responsive) => {
                 console.log(responsive)
                for(let i = 0; i < responsive.data.result.UserAttributes.length; i++){
                    if(responsive.data.result.UserAttributes[i].Name=="custom:inspira_2fa_status"){
                        this.inspira_2fa_status = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem('inspira_2fa_status',this.inspira_2fa_status )
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:inspira_id"){
                        this.inspira_id=responsive.data.result.UserAttributes[i].Value
                      localStorage.setItem('inspira_id',this.inspira_id )
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_email_status"){
                        this.fa_email_status = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem('fa_email_status',this.fa_email_status )
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_mobile_status"){
                        this.fa_mobile_status = responsive.data.result.UserAttributes[i].Value;
                        // this.fa_mobile_status = 'false'
                        localStorage.setItem('fa_mobile_status',this.fa_mobile_status )
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:2fa_ga_status"){
                        this.fa_ga_status = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem('fa_ga_status',this.fa_ga_status )
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="phone_number"){
                        this.phone_number = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem("phone_number", this.phone_number);
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:type"){
                        this.usertype = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem("usertype", this.usertype);
                    }
                    if(responsive.data.result.UserAttributes[i].Name=="custom:picture"){
                        this.picture = responsive.data.result.UserAttributes[i].Value;
                        localStorage.setItem("picture", this.picture);
                        console.log(localStorage.getItem("picture"))
                    }                     
                }
                 if( this.fa_mobile_status=='true'){
                     var data = {mobile: this.phone_number};
                     let hed = {  headers: {  Authorization: this.accToken,"Content-Type": "application/json",  }, };
                     axios.post(  "https://dapi.exus.live/api/twofa/sms/code",data, hed )
                        .then((res) => {
                           console.log(res);
                         })
                            .catch(function (error) {
                            console.log(error.response.data);
                        });
                     localStorage.setItem('stSMS',"SMSonly")
                    }
                    if( (this.fa_mobile_status=='false' || this.fa_mobile_status==''|| this.fa_mobile_status==null ) &&  this.fa_email_status=='true'){
                     localStorage.setItem('stEMAIL',"EMAILonly")
                    }
                    if(this.inspira_2fa_status=='true'){
                        this.$router.push("/permission-checking");
                    }else{
                        this.$router.push("/dashboard");
                    }
                })
                this.$toast.show("Successfully logged in", {type: "success", position: "top"});    
             } 
             catch (error) {
                this.$toast.show(error.message, {type: "error", position: "top"});
                console.log(error.message)
                console.log('No')
                this.role=false
                this.state.email = ""
                this.state.password.password = ""
            }
            setTimeout(() => this.startspinner = false, 100);
        },
        encryptData() {
           this.encData = CryptoJS.AES.encrypt( JSON.stringify(this.data), this.secret).toString();       
        },
        SubmitForm() {
            this.v$.email.$touch()
            this.v$.password.password.$touch()
            if (!this.v$.email.$touch.error && !this.v$.password.password.$touch.error) { // if ANY fail validation
                this.login();
                this.loginbtn = false;
                console.log('Form successfully submitted.')
            } else {
                console.log('Form failed validation')
            }
        },     
        async gotoforgotpassword() {
            this.state.forgotpasswordemail = "";
            this.$refs.forgotpasswordmodal.openModal();
        },
        async forgotpassword(){
            // this.$toast.show("Chekcing your Email address to send verification code", {type: "info", position: "top"});
             this.v$.forgotpasswordemail.$touch()
              if(!this.v$.forgotpasswordemail.$error){
                var username = this.state.forgotpasswordemail
                this.$refs.forgotpasswordmodal.closeModal();  
                this.$refs.otpcodemodal.openModal();
            try{
                await Auth.forgotPassword(username)
                .then(data => {
                    console.log(data.CodeDeliveryDetails.Destination)
                    this.emailnewmask = data.CodeDeliveryDetails.Destination
                    console.log("Success");
                   // this.state.forgotpasswordemail = ""
                    //this.$toast.show("Succesfully sent the email verification code. check your Email", {type: "success", position: "top"});
                })
            }catch(error){
                console.log('Sending  Failed Code')
            }
            }else{
                console.log('Sending  Failed Code') 
            }
        },    
        async otpcheck(){
               this.v$.forgotpasswordemail.$touch()
               this.v$.verificationCode.$touch()
               this.v$.newPassword.$touch()
               this.v$.confirmPassword.$touch()
           if(this.state.verificationCode!=''&&this.state.newPassword !='' && this.state.confirmPassword!='' && this.state.confirmPassword===this.state.newPassword){
                this.$refs.otpcodemodal.closeModal();
                this.$refs.successmodal.openModal();
               try{
                var username = this.state.forgotpasswordemail
                var code = this.state.verificationCode
                var new_password = this.state.newPassword
                await Auth.forgotPasswordSubmit(username, code, new_password)
               .then(data => {
                 console.log(data)
                 console.log("Success");
             })
    
            }catch(error){
                 console.log(error);
            }
           }else{
               console.log('Reset validation Failed ')
           }
        },
        async resend(){
            var username = this.state.forgotpasswordemail
            
              await Auth.forgotPassword(username)
             .then(data => {console.log(data)
                 this.$toast.show("Su", {type: "success", position: "top-right"});
             })
            .catch(error => {console.log(error)
                 this.$toast.show(error.message, {type: "error", position: "top-right"});
             })
            
        },
        async showModal() {
            alert("rrr");
        }, 
        async passwordGenereate() { //
            var passwordgene = generator.generate({
                length: 12,
                numbers: true,
                uppercase: true,
                lowercase: true,
                symbols: true
            });            
             console.log(passwordgene);
             this.passwordsuggestionvalue = passwordgene
        },
        async usePassword() { //
    //  this.state.new_password = this.passwordsuggestionvalue
        this.state.newPassword=this.passwordsuggestionvalue
        console.log( this.state.newPassword)
        this.showPasswordSuggestion = false
        this.checkPassword()
        },
        closepasswordbox() {
            this.showPasswordSuggestion = false;
        },
        alreadyLogin() {
            if(localStorage.getItem("X-LDX-Inspira-Access-Token")!=null) {
                this.$router.go(-1)
                this.$toast.show("Please logout the application before login", {type: "error", position: "top", duration: "7000"});    
            }
        }
    },
    mounted() {
     this.encryptData()
     this.passwordGenereate();
     this.alreadyLogin();
     this.$refs.usernamef.focus()
   //  this.getAttributes();
    }
}
</script>
<style lang="scss" scoped>
        @import "../../assets/scss/Signin/Signin";
</style>