<template>
  <div>
    <login-layout class="before-login">
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
            // email: '', 
            password: '',
            name:'',
            middle_name:'',
            picture:'',
            website:'',
            phone_number:'',
            data: {
                firstName: "sameera",
                lastName: "Munasinghe",
                address: "1/16,Sri soratha Mw,Nugegoda,11012",
                email: "sameera@persystance.com",
                url:'https://inspira.exus.live/'
            }
        }
    },
    methods: {
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
    },
    mounted() {
        console.log(this.data)
    }

}
</script>

<style>
    @import "../components/SignIn/signin.scss";
</style>