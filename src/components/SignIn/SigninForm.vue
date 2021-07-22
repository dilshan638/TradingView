<template>
    <div class="form-layout">
        <div class="row">
            <div class="col-md-5">
                <div class="left-logo">
                    <img src="images/logo/logo.png" />
                </div>
            </div>
            <div class="col-md-7">
                <div class="right-form">
                    <h2>LDX Exchange</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing <br/>
                    elitr, sed diam nonumy eirmod tempor invidunt ut</p>

                    <input type="email" placeholder="Email Address" v-model="state.email" class="form-control" /><br/>
                    <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>

                    <input type="password" placeholder="Password" v-model="state.password.password" class="form-control" /><br/>
                    <span class="error-msg" v-if="v$.password.password.$error">{{ v$.password.$errors[0].$message }} </span>

                    <button class="centered" @click="login">Login</button>
                    <span class="forgot-link" @click="$refs.forgotpasswordmodal.openModal()">Forgot Password</span>
                    <span class="reg">to LDX eFolio?  <router-link to="/signup">Register here</router-link></span>
                </div>
            </div>
        </div>
            <modal ref="forgotpasswordmodal">
                <template v-slot:header>
                    <h2 style="color:black">Reset your Password</h2>
                </template>

                <template v-slot:body>
                    <h5 style="color:black">Enter your Email Address</h5>
                    <input type="email" class="form-control" placeholder="Email Address" style="color:#000" v-model="state.forgotpasswordemail" />
                    <span class="error-msg" v-if="v$.forgotpasswordemail.$error">{{ v$.forgotpasswordemail.$errors[0].$message }} </span>
                </template>

                <template v-slot:footer>
                    <div>
                        <button class="mb-3" @click="forgotpassword">Send Now</button>
                        <button  class="second-btn mb-3" @click="$refs.forgotpasswordmodal.closeModal()">Cancel</button>
                    </div>
                </template>
            </modal>

            <modal ref="otpcodemodal">
                <template v-slot:header>
                    <h2 style="color:black">Security Verification</h2>
                </template>

                <template v-slot:body>
                    <p>We have sent a 6 Digit code to <br/>
                    your registered email on LDCX</p>

                    <b>ab***@***.com</b>

                    <div class="form-group mb-4">
                        <input type="text" class="form-control" placeholder="Email Verification code" v-model="state.verificationCode" />
                    </div>

                    <div class="form-group mb-4">
                        <input type="password" class="form-control" placeholder="Password" v-model="state.forgotPassword.newPassword" />
                    </div>

                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Confirm Password" v-model="state.confirmPassword" />
                    </div>                                                
                    
                </template>

                <template v-slot:footer>
                    <div>
                        <button @click="otpcheck">Next</button>
                        <span class="resend-area">Didn't Received <a style="text-decoration: underline; color: blue; cursor: pointer;" @click="resend">Resend link</a></span>
                    </div>
                </template>
            </modal>   

            <modal ref="successmodal">
                <template v-slot:header>
                    <h2 style="color:black">Password Changed</h2>
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

export default {
    name:'signinemail',
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
            forgotPassword:{
                    newPassword:''
            },
            confirmPassword:''
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
                forgotPassword:{
                    newPassword:{
                      required  
                    },
                     confirmPassword: { 
                       required,
                        sameAs:sameAs(state.forgotPassword.newPassword)
                    }

                },
               verificationCode:{
                    required
                    
                }
            }    
        }) 
        
        const v$ = useValidate(rules, state)
        return { state, v$ }
    }, 
    data() {
        return { 
            isHidden: false,
            showPassword: false,
            isHiddenMobile: false,
            showPasswordMobile: false,
            showForgotPasswordForm: false,
            //forgotpasswordemail: '',
           // verificationCode:'',
           // newPassword:''
        }
    },
    methods: {   
        async login() {
            var Cookies = require('vue-cookies')
                try {
                await Auth.signIn(this.state.email, this.state.password.password)
                .then(data=>{
                    console.log(Cookies.set('accessToken', data.signInUserSession))
                    console.log(Cookies.set('firstName', data.attributes.name))
                    console.log(Cookies.set('lastName', data.attributes.middle_name))
                    // console.log(Cookies.set('addressLine1', data.attributes.addressLine1))
                    // console.log(Cookies.set('addressLine2', data.attributes.addressLine2))
                    // console.log(Cookies.set('city', data.attributes.city))
                     //console.log(Cookies.set('state', data.attributes.state))
                    // console.log(Cookies.set('country', data.attributes.country))
                    this.accToken=data.signInUserSession.accessToken.jwtToken
                    this.role=true
                    console.log(this.accToken)
                    console.log(data.attributes.name)
                    console.log(data.attributes.middle_name)
                })
                    console.log('Yes')
                   // this.$store.commit("setAuthentication",true);
                    this.$router.push('/kyc')
                     
                    
                } catch (error) {
                
                    alert(error.message);
                    console.log(error.message)
                    console.log('No')
                    this.role=false
                }
        },
        async forgotpassword() {
        // Send confirmation code to user's email
         this.v$.forgotpasswordemail.$touch()
          var username =this.state.forgotpasswordemail

           if (!this.v$.$error){
               await Auth.forgotPassword(username)
                .then(data=>{
                console.log(data)
                console.log("Success")
                this.$refs.forgotpasswordmodal.closeModal();
                this.$refs.otpcodemodal.openModal();
            
            // this.$router.push('/ConfirmationCode');
           })
                .catch(err=>{
                console.log(err)
                console.log("Failed sending Code ")
           })
           }else{
              console.log('Code Send Failed ')   
           }
            
        },  
        async otpcheck() {
           this.v$.forgotpasswordemail.$touch()
           this.v$.verificationCode.$touch()
           this.v$.forgotPassword.newPassword.$touch()

           if (!this.v$.$error) { // if ANY fail validation
                var username =this.state.forgotpasswordemail
                var code = this.state.verificationCode
                var new_password = this.state.forgotPassword.newPassword
               await  Auth.forgotPasswordSubmit(username, code, new_password )
                .then(data=>{
                console.log(data)
                console.log("Success")
                        })
                .catch(err=>{
                    console.log(err)
                    console.log("Error")
                })
                this.$refs.otpcodemodal.closeModal();
                this.$refs.successmodal.openModal();
           } else {
                console.log('Reset failed ')
            }
          //  this.$refs.resetpasswordmodal.openModal();

        },
        async resetpassword() {
            this.$refs.resetpasswordmodal.closeModal();
            this.$refs.resetpasswordmodal.openModal();
        },

        //Resend Verification Code

        async resend(){
             var username =this.state.forgotpasswordemail
            await Auth.forgotPassword(username)
            .then(data=>{
            console.log(data)
            console.log("Resend")

           })
            .catch(err=>{
            console.log(err)
            console.log(" Resend Error")
           }) 
            
        },
        SubmitForm() {
            
           // this.v$.$validate()// checks all inputs
           this.v$.email.$touch()
           this.v$.password.$touch()
            console.log( this.v$.email)
            if (!this.v$.$error) { // if ANY fail validation
                this.login();
                console.log('Form successfully submitted.')
            } else {
                console.log('Form failed validation')
            }
        }           
    }  
}
</script>
<style lang="scss">
        @import "signin";
</style>
