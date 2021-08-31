<template>
    <div class="form-layout">
        <div class="row">
            <div class="col-md-6 mobile-hide no-padding">
                <div class="left-logo">
                    <img src="images/logo/logo.png" />
                </div>
            </div>
            <div class="col-md-6 no-padding">
                <div class="right-form">
                    <h2>LDCX Exchange</h2>
                    <p>Lorem ipsum dolor sit amet ipsum<br/>
                    consetetur sadipscing </p>

                    <div class="eye-area mb-4">
                        <input placeholder="Email" v-model="state.email" class="form-control" />
                        <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>
                    </div>

                    <div class="eye-area mb-4">
                        <input v-bind:type="[showPassword ? 'text' : 'password']" placeholder="Password" v-model="state.password.password" class="form-control" />
                            <div class="eye-box">
                                <i @click="showPassword = !showPassword" :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>
                            </div>
                        <span class="error-msg" v-if="v$.password.password.$error">{{ v$.password.$errors[0].$message }} </span>                        
                    </div>

                    <button class="centered login-btn" @click="SubmitForm">Login</button>
                    <span class="forgot-link" @click="$refs.forgotpasswordmodal.openModal()">Forgot Password</span>
                    <span class="reg">to LDX eFolio?  <router-link to="/signup">Register here</router-link></span>
                </div>
            </div>
        </div>
        <modal ref="forgotpasswordmodal" class="forgot-modal">
            <template v-slot:header>
                <h2 style="color:black">Forgot Password</h2>
            </template>
            <template v-slot:body>
                <!-- Nav tabs -->
                <ul class="nav nav-tabs modal-nav" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Email</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Mobile</button>
                </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content modal-tab">

                <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">                                            

                    
                        <h5 style="color:black">Enter your Email Address</h5>
                        <div class="form-group pos-rel">    
                            <input type="email" class="form-control" placeholder="Email Address" style="color:#000" v-model="state.forgotpasswordemail" />
                            <span class="error-msg" v-if="v$.forgotpasswordemail.$error">{{ v$.forgotpasswordemail.$errors[0].$message }} </span>  
                        </div>

                        <div class="modal-buttons">
                            <button class="mb-3" @click="forgotpassword">Next</button>
                            <button  class="second-btn mb-3" @click="$refs.forgotpasswordmodal.closeModal()">Cancel</button>
                        </div>  

                </div>

                <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    Coming soon
                </div>
                
                </div>

            </template>

        </modal>
        <modal ref="otpcodemodal">
            <template v-slot:header>
                <h2 style="color:black">Security Verification</h2>
            </template>

            <template v-slot:body>
                <p style="color:#000">We have sent a 6 Digit code to <br/>
                your registered email on LDCX</p>

                <b>ab*@*.com</b>
                <span class="resend-area">Didn't Received <a href="#" @click="resend">Resend Code</a></span>

                <div class="input-group mb-4">
                    <input type="text" class="form-control" placeholder="Email Verification code" v-model="state.verificationCode" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary input-group-btn" type="button">Send</button>
                    </div>
                    <span class="error-msg" v-if="v$.verificationCode.$error">{{ v$.verificationCode.$errors[0].$message }} </span> 
                </div>                    

                <div class="form-group mb-4 pos-rel">
                    <div class="input_container" v-if="showPasswordLength">
                        <!-- <password-generator /> -->
                        <ul>
                            <li v-bind:class="{ is_valid: contains_eight_characters }">8 Characters</li>
                            <li v-bind:class="{ is_valid: contains_number }">Contains Number</li>
                            <li v-bind:class="{ is_valid: contains_uppercase }">Contains Uppercase</li>
                            <li v-bind:class="{ is_valid: contains_special_character }">Contains Special Character</li>
                        </ul>

                    </div> 
                    <div class="password-suggestion-box" v-if="showPasswordSuggestion">
                        <h3>Auto generated Password</h3>
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
                        @input="checkPassword" placeholder="Password" v-model="state.newPassword" @focus="showPasswordLength = true" @blur="showPasswordLength = false"
                            />
                            
                            <div class="eye-box ">
                                <i @click="showPasswordotp = !showPasswordotp" :class="[showPasswordotp ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                            </div>                              
                        <div class="input-group-append">
                        <button class="btn btn-outline-secondary input-group-btn" @click="showPasswordSuggestion = true" type="button">
                            <i class="ri-lock-password-line"></i>
                        </button>
                        <span class="error-msg" v-if="v$.newPassword.$error">{{ v$.newPassword.$errors[0].$message }} </span> 
                    </div>
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
                </div>
            </template>
        </modal>   
        <modal ref="successmodal">
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

            password_length: 0,
            contains_eight_characters: false,
            contains_number: false,
            contains_uppercase: false,
            contains_special_character: false,
            valid_password: false,         

            
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

        checkPassword() {
            this.password_length = this.state.newPassword.length;
            //eslint-disable-next-line
            const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            if (this.password_length > 8) {
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
        async login() {
               try {
                await Auth.signIn(this.state.email, this.state.password.password)
                .then(data=>{
                    // console.log(Cookies.set('accessToken', data.signInUserSession))
                   this.accToken=data.signInUserSession.accessToken.jwtToken
                    this.data.firstName=data.attributes.name
                    this.data.lastName=data.attributes.middle_name
                    this.data.email=this.state.email

                 
                    localStorage.setItem('AccessToken',data.signInUserSession.accessToken.jwtToken)
                    // this.$store.commit("setAuthentication",true);



                })
                    console.log('Yes')
                    this.encryptData()
                   // window.location.href = `http://localhost:8081/kyc?data=${this.encData}`
                     window.location.href = `http://localhost:8080/#/dashboard`
                    
             } catch (error) {
                    this.$toast.show(error.message, {type: "error", position: "top-right"});
                    console.log(error.message)
                    console.log('No')
                    this.role=false
                }
        },

         encryptData() {
           this.encData = CryptoJS.AES.encrypt( JSON.stringify(this.data), this.secret).toString();       
        },

        SubmitForm() {
            this.v$.email.$touch()
            this.v$.password.password.$touch()
            if (!this.v$.email.$touch.error && !this.v$.password.password.$touch.error) { // if ANY fail validation
                this.login();
                console.log('Form successfully submitted.')
            } else {
                console.log('Form failed validation')
            }
        },
            
         async forgotpassword(){

             this.v$.forgotpasswordemail.$touch()
              if(!this.v$.forgotpasswordemail.$error){
                  var username = this.state.forgotpasswordemail
            try{
                await Auth.forgotPassword(username)
                .then(data => {
                    console.log(data.CodeDeliveryDetails.Destination)
                    console.log("Success");
                    this.state.forgotpasswordemail = ""
                })
             
            
            this.$refs.forgotpasswordmodal.closeModal();
            this.$refs.otpcodemodal.openModal()
            
            
                
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
           
           
           if(!this.v$.$error && this.state.confirmPassword===this.state.newPassword){
               try{
                var username = this.state.forgotpasswordemail
                var code = this.state.verificationCode
                var new_password = this.state.newPassword

                await Auth.forgotPasswordSubmit(username, code, new_password)
               .then(data => {
                 console.log(data)
                 console.log("Success");
             })

              this.$refs.otpcodemodal.closeModal();
             this.$refs.successmodal.openModal()
    
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
             .then(data => {
                 console.log(data)
                 console.log("Success");
             })
            
        },
        async showModal() {
            alert("rrr");
        }, 
     async   passwordGenereate() { //
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
     async   usePassword() { //
            //  this.state.new_password = this.passwordsuggestionvalue
                this.state.newPassword=this.passwordsuggestionvalue
              console.log( this.state.newPassword)
              this.showPasswordSuggestion = false
        }             
    },
    mounted() {
     this.encryptData()
     this.passwordGenereate();
    }
}
</script>
<style lang="scss">
        @import "signin";

        
</style>