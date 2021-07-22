<template>
    <div class="form-layout">
        <div class="row">
            <div class="col-md-4">
                <div class="left-logo">
                    <img src="images/logo/logo.png" />
                </div>
            </div>
            <div class="col-md-8">
                <div class="right-form">
                    <h2>LDX Exchange</h2>
                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing <br/>
                    elitr, sed diam nonumy eirmod tempor invidunt ut</p>

                    <input type="email" placeholder="Email Address" v-model="state.email" class="form-control" /><br/>
                    <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>

                    <input type="password" placeholder="Password" v-model="state.password.password" class="form-control" /><br/>
                    <span class="error-msg" v-if="v$.password.password.$error">{{ v$.password.$errors[0].$message }} </span>

                    <button class="centered" @click="SubmitForm">Login</button>
                    <a href="#" class="forgot-link">Forgot Password</a>
                    <span class="reg">to LDX eFolio?  <router-link to="/signup">Register here</router-link></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name:'signin',
    components: {
    },
    setup() {
        const state = reactive({
            email:'',
            password: {
                password: ''
            }
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
            showPasswordMobile: false

        }
    },
    methods: {   
        async login() {
            var Cookies = require('vue-cookies')
                try {
                await Auth.signIn(this.state.email, this.state.password.password)
                .then(data=>{
                    console.log(Cookies.set('accessToken', data.signInUserSession))
                    this.accToken=data.signInUserSession.accessToken.jwtToken
                    this.role=true
                    console.log(this.accToken)
                })
                    alert('Successfully logged in');
                    console.log('Yes')
                    //this.$store.commit("setAuthentication",true);
                    this.$router.push('/home'); 
                    
                } catch (error) {
                
                    alert(error.message);
                    console.log(error.message)
                    console.log('No')
                    this.role=false
                }
        },

        SubmitForm() {
            console.log('sucess')
            this.v$.$validate() // checks all inputs
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
