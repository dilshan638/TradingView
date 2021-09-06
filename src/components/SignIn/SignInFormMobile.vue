<template>    
    <div class="form-tab">
        <div class="mb-3">
            <div class="row">
                <div class="col-md-4">
                    <input class="form-control" placeholder="+94" type="text">
                </div>
                <div class="col-md-8">
                    <input class="form-control" placeholder="Mobile" type="text">
                </div>
            </div>
        </div>
        <div class="mb-3 eye-area">
            <input v-bind:type="[showPasswordMobile ? 'text' : 'password']" class="form-control" id="" placeholder="Password" value="123456">
            <div @click="showPasswordMobile = !showPasswordMobile" class="eye-mark">
                <i :class="[showPasswordMobile ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Login Now</button>
        <div class="create-account">
            Don't have an Account <router-link to="/signup">Register</router-link>
        </div>
    </div>
</template>
<script>
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

<style lang="scss" scoped>
        @import "../../assets/scss/Signin/Signin";
</style>