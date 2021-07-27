import { createApp } from 'vue'
import App from './App.vue'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import router from "./router";

const app = createApp(App);
app.use(router)
app.mount('#app');

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
app.use(VueTelInput);

//createApp(App).mount('#app')

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
