<template>    
    <div class="form-tab">
            <div class="mb-3">
                <input type="email" class="form-control" placeholder="Email" v-model="state.email">

                <input type="hidden" v-model="name" />
                <input type="hidden" v-model="middle_name" />
                <input type="hidden" v-model="picture" />
                <input type="hidden" v-model="website" />
                <input type="hidden" v-model="phone_number" />
            
                <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>
            </div>
            <div class="mb-3 eye-area">
                <input v-model="state.password.password" v-bind:type="[showPassword ? 'text' : 'password']" class="form-control" placeholder="Password">
                <span class="error-msg" v-if="v$.password.password.$error">{{ v$.password.$errors[0].$message }} </span>
                <div @click="showPassword = !showPassword" class="eye-mark">
                    <i :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>
                </div>
            </div>
            <div class="ref-info" v-on:click="isHidden = !isHidden"> 
                <span>
                    Refferal ID (Optional)
                    <i :class="[isHidden ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line']" aria-hidden="true"></i>
                </span>
            </div>
            <div class="show-ref" v-if="isHidden">
                <div class="mb-3">
                    <input type="text" class="form-control" id="" placeholder="Refferal ID">
                </div>                                    
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="terms">
                <label class="form-check-label" for="terms">I have read and understand Terms of Use</label>
                <span>Terms of Use & Privacy Policy</span>
            </div>
            <button type="submit" class="btn btn-primary" @click="SubmitForm">Create Account</button> 
            <div class="create-account">
                Alredy have an Account <router-link to="/signin">Sign in</router-link>
            </div>
    </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
    name:'signUpFormEmail',
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
            showPasswordMobile: false,
            name: '',
            middle_name: '',
            picture: '',
            website: '',
            phone_number: ''

        }
    },
    methods: {             
        SubmitForm() {
            console.log('sucess')
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) { // if ANY fail validation
                console.log('Form successfully submitted.')
                this.register();
            } else {
                console.log('Form failed validation')
            }
        },
        async register() {
            try {
                await Auth.signUp({
                    username: this.state.email,
                    password: this.state.password.password,
                    attributes:{
                        email:this.email,
                        name:this.name,
                        middle_name:this.middle_name,
                        picture:this.picture,
                        website:this.website,
                        phone_number:this.phone_number
                    }
                });
                alert('User successfully registered. Please login');
                this.$router.push('/check');
            } catch (error) {
                alert(error.message);
                console.log(error.message)
            }
        },            
    }  
}
</script>

<style>
        @import "signup.scss";
</style>