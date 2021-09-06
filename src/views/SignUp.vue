<template>
    <login-layout>
        <signup-form></signup-form>
    </login-layout>
</template>

<script>
import { Auth } from 'aws-amplify'
import LoginLayout from '../layout/LoginLayout.vue';
import SignupForm from '../components/SignupForm/SignupForm.vue';

export default {
    name:'signup',
    components: {
        LoginLayout,
        SignupForm
    },
    data(){
    return{
    email: '', 
    password: '',
    name:'',
    middle_name:'',
    picture:'',
    website:'',
    phone_number:''

    }
    },
    methods:{
    async register() {
        try {
            await Auth.signUp({
                username: this.email,
                password: this.password,

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
        } catch (error) {
            alert(error.message);
            console.log(error.message)
        }
    },
    }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/Signup/Signup";
</style>