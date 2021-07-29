<template>
    <div class="form-layout signup-area">
        <div class="row">
            <div class="col-md-12">
                <div class="right-form signup">
                    <router-link to="/signin"><div class="close-mark"><i class="ri-close-line"></i></div></router-link>
                    <h3>Register your account here.</h3>
                        <input type="hidden" v-model="picture" />
                        <input type="hidden" v-model="website" />
                    <div class="step-area">
                        <div class="step-link-area">
                            <div class="step-link" v-bind:class="[profileTab ? 'current' : '']">Personal Info</div>
                            <div class="step-link" v-bind:class="[addressTab ? 'current' : '']">Address</div>
                            <div class="step-link" v-bind:class="[passwordTab ? 'current' : '']">Password</div>
                        </div>
                        <div class="step-tab-content">
                            <div class="tab-read" v-bind:class="{ 'current': profileTab, 'de': !profileTab }">
                                <div class="view-tab">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="profile-pic">
                                                <img :src="picture" class="uploading-image" />
                                            </div>
                                            <input type="file" accept="image/png, image/gif, image/jpeg" id="pro-pic" style="display:none" @change=uploadImage>
                                            <label class="btn btn-primary dark centered" for="pro-pic">
                                                Update Profile Picture
                                            </label>                                            
                                        </div>
                                        <div class="col-md-7">
                                            <div class="form-group mb-3 pos-rel">
                                                <input type="text" placeholder="First Name" v-model="state.first_name" class="form-control" />
                                                    <span class="error-msg" v-if="v$.first_name.$error">{{ v$.first_name.$errors[0].$message }} </span>         
                                            </div>

                                            <div class="form-group mb-3 pos-rel">
                                                <input type="text" placeholder="Last Name" v-model="state.last_name" class="form-control" />
                                            <span class="error-msg" v-if="v$.last_name.$error">{{ v$.last_name.$errors[0].$message }} </span>                                            
                                            </div>

                                            <div class="form-group mb-3 pos-rel">
                                                <input type="email" placeholder="Email" v-model="state.email" class="form-control" />
                                                <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>                                           
                                            </div>     

                                            <div class="form-group pos-rel">
                                                <div class="row">
                                                    <div class="col-12">
                                                    <vue-tel-input class="form-control" aria-autocomplete="none" v-model="phone" v-on:validate="countryChanged" :inputOptions="options" :dropdownOptions="options2"> </vue-tel-input></div> 
                                                    <div class="col-12">
                                                        <span class="error-msg" v-if="v$.phone_number.$error">{{ v$.phone_number.$errors[0].$message }} </span>
                                                    </div>
                                                </div>
                                                <span class="error-msg"></span>                                            
                                            </div>                                                                              
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-tab-area">
                                    <button @click="goaddress" class="btn go-address">Next</button>
                                </div>
                            </div>
                            <div class="tab-read" v-bind:class="{ 'current': addressTab, 'de': !addressTab }">
                                <div class="view-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group pos-rel mb-4">
                                                     <select placeholder="Country" v-model="state.country" class="form-control"  >
                                                         <option value="">Select Country</option>
                                                         <option  :value="country.name" v-for="(country) in countryList" :key="country.code">{{country.name}}</option>
                                                    </select>
                                                <span class="error-msg" v-if="v$.country.$error">{{ v$.country.$errors[0].$message }} </span>                                            
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="Address Line 01" v-model="state.address_line_one" class="form-control" />
                                            <span class="error-msg" v-if="v$.address_line_one.$error">{{ v$.address_line_one.$errors[0].$message }} </span>                                           
                                            </div>
                                        </div>   

                                        <div class="col-md-6">
                                            <div class="form-group pos-rel  mb-4">
                                                <input type="text" placeholder="Address Line 02" v-model="state.address_line_two" class="form-control" />
                                            <span class="error-msg" v-if="v$.address_line_two.$error">{{ v$.address_line_two.$errors[0].$message }} </span>                                           
                                            </div>
                                        </div>  

                                        <div class="col-md-6">
                                            <div class="form-group pos-rel mb-4">
                                                <input type="text" placeholder="City" v-model="state.city" class="form-control" />
                                                <span class="error-msg" v-if="v$.city.$error">{{ v$.city.$errors[0].$message }} </span>                                            
                                            </div>
                                        </div>     

                                        <div class="col-md-6">
                                            <div class="form-group pos-rel mb-4">
                                                <input type="text" placeholder="State/ProvinceRegion" v-model="state.state" class="form-control" />
                                                <span class="error-msg" v-if="v$.state.$error">{{ v$.state.$errors[0].$message }} </span>                                            
                                            </div>
                                        </div>  

                                        <div class="col-md-6">
                                            <div class="form-group pos-rel mb-4">
                                                <input type="text" placeholder="Zip/ Postal Code" v-model="state.zip_code" class="form-control" />
                                                <span class="error-msg" v-if="v$.zip_code.$error">{{ v$.zip_code.$errors[0].$message }} </span>                                           
                                            </div>
                                        </div>                                                                                  
                                                                                
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="btn-tab-area">
                                                <button @click="gopassword" class="btn go-password">Next</button>
                                            </div> 
                                        </div>
                                    </div>   
                                </div>
                               
                            </div>
                            <div class="tab-read" v-bind:class="{ 'current': passwordTab, 'de': !passwordTab }">
                                <div class="view-tab">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="form-group mb-4">
                                                <div class="eye-area mb-4">
                                                    <input v-bind:type="[showPassword ? 'text' : 'password']" placeholder="Password" v-model="state.password" class="form-control" />
                                                    <div class="eye-box">
                                                        <i @click="showPassword = !showPassword" :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                                                    </div>                                                    
                                                    <span class="error-msg" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }} </span>     
                                                </div>                                           
                                            </div>
                                        </div>                                                                                                                                                                                  
                                    </div>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="form-group mb-4">
                                                <div class="eye-area mb-4">
                                                    <input v-bind:type="[showPasswordConfirm ? 'text' : 'password']" placeholder="Confirm Password" v-model="state.confirm_password" class="form-control" />
                                                    <div class="eye-box">
                                                        <i @click="showPasswordConfirm = !showPasswordConfirm" :class="[showPasswordConfirm ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                                                    </div>
                                                    <span class="error-msg" v-if="v$.confirm_password.$error">{{ v$.confirm_password.$errors[0].$message }} </span>   
                                                </div>                                         
                                            </div>
                                        </div>                                                                                                                                                                                
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input" id="terms">
                                                <label class="form-check-label" for="terms">
                                                    By creating an account, you agree to eFolio's Conditions of 
                                                    </label>
                                                <a href="#"><span> Use and Privacy Notice.</span></a>
                                            </div>
                                        </div>                                                                                                                                                                                
                                    </div>                                   
                                </div>
                                <div class="btn-tab-area">
                                    <button @click="gosignup" class="btn go-signup">Next</button>
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
import { required, email,minLength, sameAs} from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { Auth } from 'aws-amplify';
let countries = require('../SignupForm/countries');


export default {
  components: { },
    name:'SignupForm',

    setup() {
        const state = reactive({         
            first_name:'',
            last_name:'',
            email:'',
            phone_number:'',
            country:'',
            address_line_one:'',
            address_line_two:'',
            city:'',
            state:'',
            zip_code:'',
            password:'',
            confirm_password:'',
            picture:'',
            website:''            
            
        })
        const rules = computed(() => {
            return {
                first_name: { required,minLength: minLength(3)},
                last_name: { required,minLength: minLength(3)},
                email: { required,   email   },
                phone_number: { required},
                country: { required,minLength: minLength(3)},
                address_line_one: { required,minLength: minLength(2)},
                address_line_two: { required,minLength: minLength(2)},
                city: { required,minLength: minLength(2)},
                state: { required,minLength: minLength(2)},
                zip_code: { required},                
                password: { required},
                confirm_password: { required, sameAs:sameAs(state.password)}
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
            profileTab: true,
            addressTab: false,
            passwordTab: false,
            picture:null,
            website:null,
            countryList: countries, 
            showPasswordConfirm:false,

            options: { 
                 placeholder: "Phone Number",
                 autoFormat:true,
                mode:true
            },
            options2:{
                showDialCodeInList:true,
                showDialCodeInSelection:true,
                showFlags:true,
            }
        }
    },
    methods: {   
         countryChanged(phoneObject) {
            this.state.phone_number = phoneObject.number 
        },  
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.picture = e.target.result;
                console.log(this.picture);
            };
        },        
        async goaddress() {
            console.log("go address")

            this.v$.first_name.$touch()
            this.v$.last_name.$touch()
            this.v$.email.$touch()
            this.v$.phone_number.$touch()

            if(!this.v$.first_name.$error &&  !this.v$.last_name.$error && !this.v$.email.$error && !this.v$.phone_number.$error){
                console.log("pass ggg")
               this.profileTab = false;
               this.addressTab = true;
            }

        }, 
        async gopassword() {
            this.v$.country.$touch()
            this.v$.address_line_one.$touch()
            this.v$.address_line_two.$touch()
            this.v$.city.$touch()
            this.v$.state.$touch()
            this.v$.zip_code.$touch()
           // this.addressTab = false;
          //  this.passwordTab = true;
            if(!this.v$.country.$error &&  !this.v$.address_line_one.$error && !this.v$.address_line_two.$error && !this.v$.city.$error && !this.v$.state.$error && !this.v$.state.$error){
                console.log("pass ggg")
               this.addressTab = false;
               this.passwordTab = true;
            }         
        },
        async gosignup() {
             console.log("signup f");
            this.v$.$validate() // checks all inputs
            if (!this.v$.$error) { // if ANY fail validation
                console.log('Form successfully submitted.')
                this.register();
            } else {
                console.log('Form Failed Validation')
           }
        },
        async register() {
            try {
                await Auth.signUp({
                    username: this.state.email,
                    password: this.state.password,
                    attributes:{
                         name:this.state.first_name,
                         middle_name:this.state.last_name,
                        email:this.state.email,
                        phone_number:this.state.phone_number,
                        'custom:country':this.state.country,
                        'custom:addressLine1':this.state.address_line_one,
                        'custom:addressLine2':this.state.address_line_two,
                        'custom:city':this.state.city,
                        'custom:state':this.state.state,
                        'custom:postcode':this.state.zip_code,
                        picture:this.picture,
                        website:this.website

                     }
                });
               // alert('User successfully registered. Please login');
                this.$router.push('/signin');
                //this.$router.push('/check');
            } catch (error) {
                alert(error.message);
                console.log(error.message)
                console.log('Sign Up Failed ')
            }
        }
    },
   
    mounted() {
    }   
}
</script>
<style lang="scss">
        @import "signup";
</style>