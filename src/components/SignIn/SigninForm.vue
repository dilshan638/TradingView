<template>
    <div>
        <div class="form-area">
            <h2>Login to your Account</h2>
            <h5>Please check the url before login</h5>
            <ul class="nav nav-pills" id="pills-tab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Email</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Mobile</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <sign-in-form-email />
                </div>
                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <sign-in-form-mobile />
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import SignInFormMobile from './SignInFormMobile.vue'
import SignInFormEmail from './SignInFormEmail.vue'

export default {
  components: {SignInFormMobile, SignInFormEmail },
    name:'signinform',
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
        SubmitForm() {
            console.log('sucess')
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) { // if ANY fail validation
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
