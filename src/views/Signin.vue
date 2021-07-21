<template>
  <div>
        <login-layout>
            <signin-form />
        </login-layout>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import LoginLayout from '../layout/LoginLayout.vue';
import SigninForm from '../components/SignIn/SigninForm.vue';

export default {
    name:'signin',
    components: {
        LoginLayout,
        SigninForm
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

<style>
    @import "../components/SignIn/signin.scss";
</style>