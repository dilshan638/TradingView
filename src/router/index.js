import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Check from '../views/Check.vue';
import Kyc from '../components/Kyc/Kyc.vue';

//Import store
//import store from "../store";

const routes=[
    {
        path:'/',
        component:SignIn
    },
    {
        path:'/signup',
        component:SignUp
    },
    {
        path:'/signin',
        component:SignIn
    },
    {
        path:'/check',
        component:Check
    },
    {
        path:'/kyc',
        component:Kyc,
       //beforeEnter:(to,from,next)=>{
          // if(store.state.authenticated==false){
           //  next(false)
         //  }else{
           // next()
        // }
    //  }
    }
];

const router = createRouter({
 // mode:'history',
  history: createWebHashHistory(),
  routes
});

export default router;