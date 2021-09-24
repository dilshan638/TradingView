import { createRouter, createWebHistory } from "vue-router";

import SignUp from '../views/SignUp.vue';
import SignIn from '../views/Signin.vue';
import Dashboard from '../views/Dashboard';
import Wallet from '../views/Wallet';
import SecurityPage from '../views/Security';
import Orders from '../views/Orders'; 
import SecuritySetting from '../views/SecuritySetting.vue';
import Trade from '../views/Trade.vue';
import Market from '../views/Market.vue';
import Security from '../components/Security/Security.vue';
import Home from '../views/Home.vue';
import Permission from '../views/Permission.vue';


import Setting from '../views/Setting.vue';
import CryptoOne from '../components/Wallet/CryptoOne.vue';

import Websoket from '../views/WebSocket/Websoket.vue';

import History from '../views/History.vue';
import WithdrawalDetails from '../views/WithdrawDetails.vue';
//Import store
// import store from "../store";Withdrawal Details

import BuyAndSellList from '../components/Trade/BuyAndSellList.vue';

function guardmyrouter(to, from, next) {
    var isauthoticated = false;
    if(localStorage.getItem("X-LDX-Inspira-Access-Token")!=null){
        isauthoticated = true;
    }
    else{
        isauthoticated = false;
    }
    if(isauthoticated) {
        next();
    }
    else{
        next("/signin")
    }

}

localStorage.setItem('permissionSuccess','permissionSuccess' )

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
        path:'/dashboard',
        component:Dashboard,
        beforeEnter : guardmyrouter

    //     BeforeEnter : (to, from, next) => {
    //          if(localStorage.getItem("X-LDX-Inspira-Access-Token")==null){
    //             next("/signin");
    //      } else{
    //          next();
    //      }
    //  }
    },
    {
        path:'/wallet',
        component:Wallet,
        beforeEnter : guardmyrouter
    },    
    {
        path:'/securitypage',
        component:SecurityPage,
        beforeEnter : guardmyrouter
    }, 
    {
        path:'/orders',
        component:Orders,
        beforeEnter : guardmyrouter
    },    
    {
        path:'/securitysetting',
        component:SecuritySetting,
        beforeEnter : guardmyrouter
    },       
    {
        path:'/security',
        component:Security,
        beforeEnter : guardmyrouter
    },
    {
        path:'/trade',
        component:Trade,
        beforeEnter : guardmyrouter
    },    
    {
        path:'/market',
        component:Market
    },
    {
        path:'/setting',
        component:Setting,
        beforeEnter : guardmyrouter
    },
    
    {
        path:'/withdraw-crypto',
        component:CryptoOne,
        beforeEnter : guardmyrouter
    },
    {
        path:'/history',
        component:History,
        beforeEnter : guardmyrouter
    },
    {
        path:'/permission-checking',
        component:Permission,
        beforeEnter : guardmyrouter
    },
    {
        path:'/withdrawal-details',
        component:WithdrawalDetails,
        beforeEnter : guardmyrouter 
    } ,
    {
        path:'/web-socket',
        component:Websoket,
        beforeEnter : guardmyrouter
    },
    {
        path:'/buy-sell-list',
        component:BuyAndSellList,
        beforeEnter : guardmyrouter
    }          
];

const router = createRouter({
    mode:'history',
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    history: createWebHistory(),
    routes
});


export default router;