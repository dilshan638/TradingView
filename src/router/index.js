import { createRouter, createWebHashHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Check from '../views/Check.vue';
import Dashboard from '../views/Dashboard';
import Wallet from '../views/Wallet';
import SecurityPage from '../views/Security';
import Orders from '../views/Orders';
import SecuritySetting from '../views/SecuritySetting.vue';
import Trade from '../views/Trade.vue';
import Market from '../views/Market.vue';
import Security from '../components/Security/Security.vue';

//Import store
//import store from "../store";
import Test from '../views/Test.vue';
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
        component:SignIn,
        props: (route) => ({ name: route.query.name })
    },
    {
        path:'/check',
        component:Check
    },
    {
        path:'/dashboard',
        component:Dashboard
    },
    {
        path:'/wallet',
        component:Wallet
    },    
    {
        path:'/securitypage',
        component:SecurityPage
    }, 
    {
        path:'/orders',
        component:Orders
    },    
    {
        path:'/securitysetting',
        component:SecuritySetting
    },       
    {
        path:'/security',
        component:Security
    },
    {
        path:'/market',
        component:Market
    },    {
        path:'/market',
        component:Trade
    },

    {
        path:'/test',
        component:Test
    }
   
];

const router = createRouter({
    // mode:'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    history: createWebHashHistory(),
    routes
});

export default router;