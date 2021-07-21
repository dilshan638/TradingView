import { createApp } from 'vue'
import App from './App.vue'
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import router from "./router";

const app = createApp(App);
app.use(router)
app.mount('#app');

//createApp(App).mount('#app')

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
