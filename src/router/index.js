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


import Setting from '../components/Setting/Setting.vue';
import CryptoOne from '../components/Wallet/CryptoOne.vue';
import CryptoTwo from '../components/Wallet/CryptoTwo.vue';
import WizardSuccessfullyPage from '../components/SecuritySetting/WizardSuccessfullyPage.vue';


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
        path:'/trade',
        component:Trade
    },    
    {
        path:'/market',
        component:Market
    },
    {
   
        path:'/setting',
        component:Setting
    },
     {
        path:'/successfully',
        component:WizardSuccessfullyPage
    },
    {
        path:'/wallet/cryptoone',
        component:CryptoOne
    },
    {
        path:'/wallet/cryptotwo',
        component:CryptoTwo
    },
   
];

const router = createRouter({
    // mode:'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    history: createWebHashHistory(),
    routes
});

export default router;