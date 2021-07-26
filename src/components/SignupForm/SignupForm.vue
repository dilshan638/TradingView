<template>
    <div class="form-layout signup-area">
        <div class="row">
            <div class="col-md-12">
                <div class="right-form signup">
                    <router-link to="/signin"><div class="close-mark"><i class="ri-close-line"></i></div></router-link>
                    <h3>Register your account here.</h3>
                        <input type="hidden" v-model="picture" />
                        <input type="hidden" v-model="website" />
                    <div class="tab-area">
                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link profile-link"
                                v-bind:class="[profileTab ? 'active' : '']"
                                id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Persoanl Info</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link address-link" 
                                v-bind:class="[addressTab ? 'active' : '']"
                                id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Address</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link password-link" 
                                v-bind:class="[passwordTab ? 'active' : '']"
                                id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Password</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade"
                            v-bind:class="[profileTab ? 'show active' : '']"
                            id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div class="tab-view profile-view">
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
                                            <div class="form-group mb-3">
                                                <input type="text" placeholder="First Name" v-model="state.first_name" class="form-control" />
                                                    <span class="error-msg" v-if="v$.first_name.$error">{{ v$.first_name.$errors[0].$message }} </span>         
                                            </div>

                                            <div class="form-group mb-3">
                                                <input type="text" placeholder="Last Name" v-model="state.last_name" class="form-control" />
                                            <span class="error-msg" v-if="v$.last_name.$error">{{ v$.last_name.$errors[0].$message }} </span>                                            
                                            </div>

                                            <div class="form-group mb-3">
                                                <input type="email" placeholder="Email" v-model="state.email" class="form-control" />
                                                <span class="error-msg" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }} </span>                                           
                                            </div>     

                                            <div class="form-group">
                                                <div class="row">
                                                    <!-- <div class="col-4">
                                                        <input type="text" placeholder="+94" v-model="phcode" class="form-control" />
                                                    </div> -->
                                                    <div class="col-12">
                                                        <input type="text" placeholder="Phone No" v-model="state.phone_number" class="form-control" />
                                                        <span class="error-msg" v-if="v$.phone_number.$error">{{ v$.phone_number.$errors[0].$message }} </span>
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
                            <div class="tab-pane fade" 
                            v-bind:class="[addressTab ? 'show active' : '']"
                            id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div class="tab-view address-view">
                                    <div class="row">

                                        <div class="col-md-6">
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="Country" v-model="state.country" class="form-control" />
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
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="Address Line 02" v-model="state.address_line_two" class="form-control" />
                                            <span class="error-msg" v-if="v$.address_line_two.$error">{{ v$.address_line_two.$errors[0].$message }} </span>                                           
                                            </div>
                                        </div>  

                                        <div class="col-md-6">
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="City" v-model="state.city" class="form-control" />
                                                <span class="error-msg" v-if="v$.city.$error">{{ v$.city.$errors[0].$message }} </span>                                            
                                            </div>
                                        </div>     

                                        <div class="col-md-6">
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="State/ProvinceRegion" v-model="state.state" class="form-control" />
                                                <span class="error-msg" v-if="v$.state.$error">{{ v$.state.$errors[0].$message }} </span>                                            
                                            </div>
                                        </div>  

                                        <div class="col-md-6">
                                            <div class="form-group mb-4">
                                                <input type="text" placeholder="Zip/ Postal Code" v-model="state.zip_code" class="form-control" />
                                                <span class="error-msg" v-if="v$.zip_code.$error">{{ v$.zip_code.$errors[0].$message }} </span>                                           
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
                            <div class="tab-pane fade" v-bind:class="[passwordTab ? 'show active' : '']" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                <div class="tab-view password-view">
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="form-group mb-4">
                                                <div class="eye-area mb-4">
                                                    <input v-bind:type="[showPassword ? 'text' : 'password']" placeholder="Password" v-model="state.password" class="form-control" />
                                                    <div class="eye-box">
                                                        <i @click="showPassword = !showPassword" :class="[showPassword ? 'ri-eye-off-line' : 'ri-eye-line']" aria-hidden="true"></i>  
                                                    </div>                                
                                                    <span class="error-msg" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>     
                                                </div>                                       
                                            </div>
                                        </div>                                                                                                                                                                                
                                    </div>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <div class="form-group mb-4">
                                                <div class="eye-area">
                                                    <input v-bind:type="[showPasswordConfirm ? 'text' : 'password']"   placeholder="Confirm Password" v-model="state.confirm_password" class="form-control" />
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
                                                <label class="form-check-label" for="terms">I have read and understand Terms of Use</label>
                                                <span>Terms of Use & Privacy Policy</span>
                                            </div>
                                        </div>                                                                                                                                                                                
                                    </div>                                
                                    
                                    <div class="row">
                                        <div class="col-md-12">
                                            <button class="pull-right slide-btn" @click="SubmitForm">Submit</button>
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
import { required, email,minLength, sameAs} from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { Auth } from 'aws-amplify';
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
            website:'',
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
            showPasswordConfirm: false,
            isHiddenMobile: false,
            profileTab: true,
            addressTab: false,
            passwordTab: false,
            picture:null
        }
    },
    methods: {     
        profilesubmit() {
            this.addressTab = true;
            this.profileTab = false;
        }, 
        addresssubmit() {
            this.addressTab = false;
            this.profileTab = false;
            this.passwordTab = true;
        },
         SubmitForm() {
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
                alert('User successfully registered. Please login');
                //this.$router.push('/check');
            } catch (error) {
                alert(error.message);
                console.log(error.message)
                console.log('Sign Up Failed ')
            }
        }, 
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.picture = e.target.result;
                console.log(this.picture);
            };
        }
    },
    mounted() {
    }   
}
</script>
<style lang="scss">
        @import "signup";
</style>
