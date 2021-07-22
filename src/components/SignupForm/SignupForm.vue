<template>
    <div class="form-layout">
        <div class="row">
            <div class="col-md-12">
                <div class="right-form">
                    <h3>Register your account here.</h3>

                    <div class="tab-area">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Persoanl Info</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Address</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Password</button>
                        </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <div class="tab-view profile-view">
                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="profile-pic">

                                        </div>
                                        <button class="dark centered">Update Profile Picture</button>
                                    </div>
                                    <div class="col-md-7">

                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="First Name" v-model="firstname" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>

                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="Sur Name" v-model="surname" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>

                                        <div class="form-group mb-4">
                                            <input type="email" placeholder="Email" v-model="email" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>     

                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-4">
                                                    <input type="text" placeholder="+94" v-model="phcode" class="form-control" />
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" placeholder="Phone No" v-model="phonenumber" class="form-control" />
                                                </div>
                                            </div>
                                            <span class="error-msg"></span>                                            
                                        </div>                                                                              
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button class="pull-right slide-btn" @click="profilesubmit">Next</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <div class="tab-view address-view">
                                <div class="row">

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="Country" v-model="country" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>    

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="Address Line 01" v-model="address1" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>    

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="Address Line 02" v-model="address2" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>  

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="City" v-model="city" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>     

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="State/ProvinceRegion" v-model="region" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>  

                                    <div class="col-md-6">
                                        <div class="form-group mb-4">
                                            <input type="text" placeholder="Zip/ Postal Code" v-model="postalcode" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>                                                                                                                                               
                                                                             
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <button class="pull-right slide-btn" @click="addresssubmit">Next</button>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                            <div class="tab-view password-view">
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="form-group mb-4">
                                            <input type="password" placeholder="Password" v-model="userpassword" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>                                                                                                                                                                                
                                </div>
                                <div class="row">
                                    <div class="col-md-10">
                                        <div class="form-group mb-4">
                                            <input type="password" placeholder="Confirm Password" v-model="confirmpassword" class="form-control" />
                                            <span class="error-msg"></span>                                            
                                        </div>
                                    </div>                                                                                                                                                                                
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="terms">
                                            <label class="form-check-label" for="terms">I have read and understand Terms of Use</label>
                                            <span>Terms of Use & Privacy Policy</span>
                                        </div>
                                    </div>                                                                                                                                                                                
                                </div>                                
                                
                                <div class="row">
                                    <div class="col-md-12">
                                        <button class="pull-right slide-btn" @click="confirmsubmit">Next</button>
                                    </div>
                                </div>                                  
                            </div>
                        </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  components: { },
    name:'SignupForm',
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
        @import "signup.scss";
</style>
