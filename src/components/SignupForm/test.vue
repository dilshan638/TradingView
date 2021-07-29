<template>
    <div class="form-layout signup-area">
        <div class="row">
            <div class="col-md-12">
                <input type="text" v-model="firstname" class="form-control" /><br/>
                <input type="text" v-model="email" class="form-control" /><br/>
                <button class="btn" @click="sendpost">Send now<button>
            </div>
        </div>
    </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email,minLength, sameAs} from '@vuelidate/validators'
import { reactive, computed } from 'vue'
import { Auth } from 'aws-amplify';
let countries = require('./countries');
export default {
  components: { },
    name:'test',
    data() {
        return { 
            firstname: '',
            email: ''
        }
    },
    methods: {   
         sendpost() {
         
        }
    },
    mounted() {
    }   
}
</script>
<style lang="scss">
        @import "signup";
</style>