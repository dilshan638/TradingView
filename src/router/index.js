import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Check from '../views/Check.vue';
import Dashboard from '../views/Dashboard';

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
        path:'/dashboard',
        component:Dashboard
    }
];

const router = createRouter({
 // mode:'history',
  history: createWebHashHistory(),
  routes
});

export default router;