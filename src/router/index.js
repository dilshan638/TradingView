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
import Home from '../views/Home.vue';


import Setting from '../components/Setting/Setting.vue';
import CryptoOne from '../components/Wallet/CryptoOne.vue';
<<<<<<< HEAD
import WizardSuccessfullyPage from '../components/SecuritySetting/WizardSuccessfullyPage.vue';

=======
import CryptoTwo from '../components/Wallet/CryptoTwo.vue';
import WizardSuccessfullyPage from '../components/SecuritySetting/WizardSuccessfullyPage.vue';

import History from '../components/History/History.vue';
>>>>>>> b6757e44c5649aeb96c6e51e751cebe4fc3aa430

//Import store
//import store from "../store";
const routes=[
    {
        path:'/',
        component:Home
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