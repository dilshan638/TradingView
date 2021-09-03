<template>    
    <div class="form-tab">
        <div class="mb-3">
            <input type="email" class="form-control" placeholder="Email" v-model="state.email">
            <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>
        </div>
        <div class="mb-3 eye-area">
            <input v-model="state.password.password" v-bind:type="[showPassword ? 'text' : 'password']" class="form-control" placeholder="Password">
            <span class="error-msg" v-if="v$.password.password.$error">{{ v$.password.$errors[0].$message }} </span>
            <div @click="showPassword = !showPassword" class="eye-mark">
                <i :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>
            </div>
            <a data-toggle="modal" data-target="#forgotpassowrd">Forgot Password</a>
        </div>
        <button type="submit" class="btn btn-primary" @click="SubmitForm">Login Now</button>
        <div class="create-account">
            Don't have an Account <router-link to="/signup">Register</router-link>
        </div>
    </div>  
</template>
<script>
import { Auth } from 'aws-amplify';
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name:'signinemail',
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
                    console.log(Cookies.set('X-LDX-Inspira-Access-Token', data.signInUserSession))
                    this.accToken=data.signInUserSession.accessToken.jwtToken
                    this.role=true
                    console.log(this.accToken)
                })
                    alert('Successfully logged in');
                    console.log('Yes')
                    // this.$store.commit("setAuthentication",true);
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

<style>
        @import "signin.scss";
</style>